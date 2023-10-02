import React, { ReactNode, useRef, useCallback, useEffect, useState } from "react";

interface InfiniteScrollProps {
  loadMore: () => void;
  height: number;
  children: ReactNode;
}

const InfiniteScrollList: React.FC<InfiniteScrollProps> = ({
  loadMore,
  height,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if(!hasMore) return
    setIsLoading(true)
    if (!isLoading && containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      if (hasMore && scrollTop + clientHeight >= scrollHeight - 10) {
        loadMore();
      }
    }
  }, [isLoading, loadMore, hasMore]);

  useEffect(() => {
    handleScroll();
  }, []);

  const containerHeight = containerRef.current?.clientHeight || 0;
  const contentHeight = contentRef.current?.scrollHeight || 0;
  const minHeight =
    contentHeight <= containerHeight ? containerHeight + 1 : contentHeight;

  return (
    <div
      className="infinite-scroll-list"
      ref={containerRef}
      style={{
        height,
        background: "#ccc",
        overflowY: "scroll",
      }}
      onScroll={handleScroll}
    >
      <div ref={contentRef} style={{ paddingBottom: "1rem", minHeight }}>
        {children}
        {isLoading && <p>Carregando...</p>}
      </div>
    </div>
  );
};

export default InfiniteScrollList;
