import { apolloClient } from 'lib/graphql/graphql-apollo-client';
import { Listing_Query } from 'lib/graphql/query/listing';
import { SetStateAction, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  ActualData,
  ListingProps,
  list,
  result,
} from 'lib/component-props/EspireTemplateProps/Listing/ListingProps';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

//Listing

const Listing = (props: ListingProps): JSX.Element => {
  const [data, setData] = useState<ListingProps>();
  const [loadMore, SetLoadMore] = useState('');
  const [count, SetCount] = useState(5);
  const [result, Setresult] = useState<ListingProps>();
  const [hasnext, SetHasNext] = useState<ListingProps>();
  const [items, setItems] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const initialState: SetStateAction<never[]> = [];

  const { sitecoreContext } = useSitecoreContext();
  const scope = props?.params?.Scope;
  const language = sitecoreContext?.language;

  const GetList = async (): Promise<unknown> => {
    const { data } = await apolloClient.query({
      query: Listing_Query,
      variables: {
        contextItem: scope,
        language: language,
        first: count as number,
        after: loadMore,
      },
    });
    return data;
  };
  const refresh = () => {
    setItems(initialState);
  };

  useEffect(() => {
    async function startFetching() {
      setData(undefined);
      const result = await GetList();
      if (!ignore) {
        SetCount(props?.params?.['Display Count'] as unknown as number);
        setData(
          (result as ListingProps)?.ListingData?.children?.results as unknown as ListingProps
        );
        SetLoadMore((result as ListingProps)?.ListingData?.children?.pageInfo?.endCursor);
        SetHasNext(
          (result as ListingProps)?.ListingData?.children?.pageInfo
            ?.hasNext as unknown as ListingProps
        );
        Setresult(result as ListingProps);
        setFinalData(data as unknown as []);
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    SetHasNext(undefined);
    function isHasNext() {
      SetHasNext(
        (result as ListingProps)?.ListingData?.children?.pageInfo
          ?.hasNext as unknown as ListingProps
      );
      setFinalData(data as unknown as []);
    }

    isHasNext();
  }, [result, data]);
  const LoadMore = async () => {
    let finalData = [data]?.flat();
    const result = await GetList();

    finalData = [
      ...[finalData],
      ...[(result as ListingProps)?.ListingData?.children?.results as unknown as ListingProps],
    ]?.flat();
    setData(finalData as unknown as ListingProps);
    if (hasnext) {
      SetLoadMore((result as ListingProps)?.ListingData?.children?.pageInfo?.endCursor);
    }
    Setresult(result as ListingProps);
  };

  return (
    <div className={`${props?.params?.styles} default-listing`}>
      {props?.params?.['Show More'] ? (
        <div className="listing">
          {finalData?.map((item: list, index) => {
            let items = [];
            items = item?.fields as unknown as [];
            return (
              <div key={index} className="list">
                {items?.map((childData: result, index) => {
                  return (
                    (childData?.name as unknown as string) == 'Title' && (
                      <h1 key={index}>
                        {childData?.name as unknown as string} : {''}
                        {childData?.value as unknown as string}
                      </h1>
                    )
                  );
                })}
              </div>
            );
          })}
          {data ? (
            <button onClick={() => LoadMore()} className="button">
              Load More
            </button>
          ) : (
            ''
          )}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={items?.length}
          next={LoadMore}
          hasMore={true}
          loader={<span className="hidden"></span>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          refreshFunction={refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}> Pull down to refresh</h3>}
          releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>Release to refresh</h3>}
        >
          <div className="listing">
            {finalData?.map((item: list, index) => {
              let items = [];
              items = item?.fields as unknown as [];
              return (
                <div key={index} className="list">
                  {items?.map((childData: result, index) => {
                    return (
                      (childData?.name as unknown as string) == 'Title' && (
                        <div key={index}>
                          {childData?.name as unknown as string} :{''}
                          {childData?.value as unknown as string}
                        </div>
                      )
                    );
                  })}
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export const ListCard = (props: ListingProps): JSX.Element => {
  const [data, setData] = useState<ListingProps>();
  const [loadMore, SetLoadMore] = useState('');
  const [count, SetCount] = useState(5);
  const [result, Setresult] = useState<ListingProps>();
  const [hasnext, SetHasNext] = useState<ListingProps>();
  const [items, setItems] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const initialState: SetStateAction<never[]> = [];

  const { sitecoreContext } = useSitecoreContext();
  const scope = props?.params?.Scope;
  const language = sitecoreContext?.language;

  const GetList = async (): Promise<unknown> => {
    const { data } = await apolloClient.query({
      query: Listing_Query,
      variables: {
        contextItem: scope,
        language: language,
        first: count as number,
        after: loadMore,
      },
    });
    return data;
  };
  const refresh = () => {
    setItems(initialState);
  };

  useEffect(() => {
    async function startFetching() {
      setData(undefined);
      const result = await GetList();
      if (!ignore) {
        SetCount(props?.params?.['Display Count'] as unknown as number);
        setData(
          (result as ListingProps)?.ListingData?.children?.results as unknown as ListingProps
        );
        SetLoadMore((result as ListingProps)?.ListingData?.children?.pageInfo?.endCursor);
        SetHasNext(
          (result as ListingProps)?.ListingData?.children?.pageInfo
            ?.hasNext as unknown as ListingProps
        );
        Setresult(result as ListingProps);
        setFinalData(data as unknown as []);
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    SetHasNext(undefined);
    function isHasNext() {
      SetHasNext(
        (result as ListingProps)?.ListingData?.children?.pageInfo
          ?.hasNext as unknown as ListingProps
      );
      setFinalData(data as unknown as []);
    }

    isHasNext();
  }, [result, data]);
  const LoadMore = async () => {
    let finalData = [data]?.flat();
    const result = await GetList();

    finalData = [
      ...[finalData],
      ...[(result as ListingProps)?.ListingData?.children?.results as unknown as ListingProps],
    ]?.flat();
    setData(finalData as unknown as ListingProps);
    if (hasnext) {
      SetLoadMore((result as ListingProps)?.ListingData?.children?.pageInfo?.endCursor);
    }
    Setresult(result as ListingProps);
  };
  let newData: unknown[] = [];

  finalData?.forEach((item: list) => {
    let items = [];
    items = item?.fields as unknown as [];
    const filteredData = items?.filter((item: result) => {
      return item.name === 'Title' || item?.name === 'Content' || item?.name === 'Image';
    });
    newData = [...newData, ...[filteredData]];
    return newData;
  });

  const actualData: unknown[] = [];
  let newObj = {};
  newData.forEach((newData, index) => {
    const urlData = (finalData[index] as list)?.url;
    const emptyObject = Object.assign({ urlData });
    (newData as [])?.forEach((element: { name: string; jsonValue: unknown }) => {
      newObj = Object.assign(emptyObject, { [element.name]: element.jsonValue });
    });
    actualData?.push(newObj);
  });

  return (
    <div className={`${props?.params?.styles} listing card-listing`}>
      {props?.params?.['Show More'] ? (
        <>
          <div className="container">
            <div className="blogs">
              <div className="py-0">
                <div className="row row-cols-1 row-cols-md-3 gx-5 gy-5">
                  {actualData?.map((item: ActualData, index: number) => {
                    return (
                      <div className="col" key={index}>
                        <div className="img-title">
                          <img src={item?.Image?.value?.src} alt={item?.Image?.value?.alt} />
                          <div className="rounded-bottom-4 blog-info">
                            <div className="blog-title">{item?.Title?.value}</div>
                            <p>{item?.Content?.Value}</p>
                            <a href={item?.urlData?.url} className="secondary-btn">
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {data && (
              <div className="mt-5 mx-auto my-0">
                <button onClick={() => LoadMore()} className="button">
                  Load More
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <InfiniteScroll
          dataLength={items?.length}
          next={LoadMore}
          hasMore={true}
          loader={<span className="hidden"></span>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          refreshFunction={refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}> Pull down to refresh</h3>}
          releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>Release to refresh</h3>}
        >
          <div className="listing">
            {finalData?.map((item: list, index) => {
              let items = [];
              items = item?.fields as unknown as [];
              return (
                <div key={index} className="list">
                  {items?.map((childData: result, index) => {
                    return (
                      (childData?.name as unknown as string) == 'Title' && (
                        <div key={index}>
                          {childData?.name as unknown as string} :{''}
                          {childData?.value as unknown as string}
                        </div>
                      )
                    );
                  })}
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Listing;
