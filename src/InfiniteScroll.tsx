import React, { useRef, ReactNode } from "react";
import ReactInfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollProps {
  fetchMoreData: () => void;
  children: ReactNode;
  dataLength: number;
  height: number;
  isLoading: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ ...props }) => {
  const { children, dataLength, isLoading, height, fetchMoreData } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrolToTop = () => {
    if ((contentRef.current?.clientHeight || 0) <= height) {
      containerRef.current?.scrollTo({ top: 0 });
    }
  };

  return (
    <div
      id="scrollableDiv"
      ref={containerRef}
      style={{ height: `${height}rem`, overflowX: "auto", overflowY: "scroll" }}
    >
      <ReactInfiniteScroll
        dataLength={dataLength}
        next={() => {
          scrolToTop();
          fetchMoreData();
        }}
        onScroll={scrolToTop}
        hasMore={isLoading}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        <div ref={contentRef} style={{ minHeight: `${height}rem`}}>
          {children}
        </div>
      </ReactInfiniteScroll>
    </div>
  );
};

export default InfiniteScroll;
