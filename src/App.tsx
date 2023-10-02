import { useState, useEffect } from "react";
import InfiniteScroll from "./InfiniteScroll";
import "./App.css";

interface TableDataProps {
  show: boolean;
  item: undefined[]
  fetchMoreData: () => void
  hasMore: boolean
  i: number
}

const TableData: React.FC<TableDataProps> = ({ show, item, fetchMoreData, hasMore, i }) => {
  return (
    <table id="table-data">
      <thead>
        <tr>
          <th>
            <div style={{ paddingLeft: 60 }}></div>
            {i} - Coluna 1
          </th>
          <th>Coluna 2</th>
          <th>Coluna 3</th>
          <th>Coluna 4</th>
          <th>Coluna 5</th>
          <th>Coluna 6</th>
        </tr>
      </thead>
      {show && (
        <InfiniteScroll
          dataLength={item.length}
          fetchMoreData={fetchMoreData}
          height={17.5}
          isLoading={hasMore}
        >
          <tbody>
            <tr>
              <td>
                <div style={{ paddingLeft: 60 }}></div>
                Dados 1
              </td>
              <td>Dados 2</td>
              <td>Dados 3</td>
              <td>Dados 4</td>
              <td>Dados 5</td>
              <td>Dados 6</td>
            </tr>
            <tr>
              <td>
                <div style={{ paddingLeft: 60 }}></div>
                Dados 1
              </td>
              <td>Dados 2</td>
              <td>Dados 3</td>
              <td>Dados 4</td>
              <td>Dados 5</td>
              <td>Dados 6</td>
            </tr>
            <tr>
              <td>
                <div style={{ paddingLeft: 60 }}></div>
                Dados 1
              </td>
              <td>Dados 2</td>
              <td>Dados 3</td>
              <td>Dados 4</td>
              <td>Dados 5</td>
              <td>Dados 6</td>
            </tr>
            <tr>
              <td>
                <div style={{ paddingLeft: 60 }}></div>
                Dados 1
              </td>
              <td>Dados 2</td>
              <td>Dados 3</td>
              <td>Dados 4</td>
              <td>Dados 5</td>
              <td>Dados 6</td>
            </tr>
          </tbody>
        </InfiniteScroll>
      )}
    </table>
  );
};

function App() {
  const [item, setItem] = useState<undefined[]>(Array.from({ length: 5 }));
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMoreData = () => {
    if (item.length >= 200) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItem((old) => {
        const newItems = Array.from<undefined>({ length: 5 });
        return old.concat(newItems);
      });
    }, 1);
  };

  const [openGroups, setOpenGroups] = useState<string[]>(
    item.map((_, i) => `item-${i}`)
  );

  const toggleTable = (group: string) => {
    console.log("clique", group);
    if (openGroups.includes(group)) {
      setOpenGroups(openGroups.filter((item) => item !== group));
    } else {
      setOpenGroups([...openGroups, group]);
    }
  };

  useEffect(() => {
    console.log(openGroups);
  }, [openGroups]);

  return (
    <>
      <table id="infinite-scroll">
        <thead>
          <tr>
            <th>Titulo 1</th>
            <th>Titulo 2</th>
            <th>Titulo 3</th>
            <th>Titulo 4</th>
            <th>Titulo 5</th>
            <th>Titulo 6{/* <div style={{ paddingRight: 50 }}></div> */}</th>
          </tr>
        </thead>
        <tbody>
          <InfiniteScroll
            dataLength={item.length}
            fetchMoreData={fetchMoreData}
            height={37}
            isLoading={hasMore}
          >
            {item.map((_, index) => (
              <tr
                key={index}
                data-group={`item-${index}`}
                onClick={() => toggleTable(`item-${index}`)}
              >
                <td>
                  {/* <InfiniteScroll
                    dataLength={item.length}
                    fetchMoreData={fetchMoreData}
                    height={17.5}
                    isLoading={hasMore}
                  > */}
                    <TableData
                      data-group={`item-${index}`}
                      show={openGroups.includes(`item-${index}`)}
                      fetchMoreData={fetchMoreData}
                      hasMore={hasMore}
                      item={item}
                      key={index}
                      i={index}
                    />
                  {/* </InfiniteScroll> */}
                </td>
              </tr>
            ))}
          </InfiniteScroll>
        </tbody>
      </table>
    </>
  );
}

export default App;
