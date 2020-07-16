import { useEffect, useMemo, useState, useCallback } from 'react';
import { PaginationProps } from 'antd/lib/pagination';
// import { WrappedFormUtils } from 'antd/lib/form/Form';

type CustomPaginationProps = PaginationProps | false;

interface IPage {
  pageNo: number;
  pageSize?: number;
  total: number;
}

interface ISearch {
  pageNo?: number;
  pageSize?: number;
  [key: string]: any;
}

interface IOptions<T> {
  actionType?: string;
  // 请求函数，当返回一个带有分页的 Promise数据时，可自动获取，不用再传pageOptions
  onFetch: (searchData: T) => void;
  // 当组件卸载执行
  onDestroy?: () => void;
  // 当前的页码数据
  pageOptions?: IPage | null | false;
  // 选择的页数配置，默认['10', '20', '30', '50']
  pageSizeOptions?: string[];
  // 手否加载完成后立即请求
  immediate?: boolean;
  // 当search变动时,可以使用这个参数去修改redux的值
  onSearchChange?: (searchData: T) => void;
  // form
  // form?: WrappedFormUtils<T>;
}

// T为搜索参数的一个接口
export default function useConnectTable<T extends ISearch>(search: T, options: IOptions<T>) {
  const { pageOptions, onFetch, onDestroy, pageSizeOptions, immediate = true } = options;

  const { pageNo = 1, pageSize = 20, total = 0 } = pageOptions || {};
  const [pageData, setPageData] = useState({ pageNo: 0, pageSize: 0, total: 0 });
  const [saerchData, setSearchData] = useState(search);

  useEffect(() => {
    if (search && Object.keys(search).length > 0 && search !== saerchData) setSearchData(search);
  }, [search]);

  const fetch = async (searchData: T) => {
    try {
      const res: any = await onFetch(searchData);
      if (res.data && res.data.pageNo) {
        console.log(res.data.pageNo, res.data.pageSize, '-pageSize--');
        setPageData({
          pageNo: res.data.pageNo,
          pageSize: res.data.pageSize,
          total: res.data.totalCount,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onPageChange = (current: number, currentPageSize?: number) =>
    fetch({ ...saerchData, pageNo: current, pageSize: currentPageSize });

  // 直接放置到table的pagination
  const pagination = useMemo<CustomPaginationProps>(() => {
    if (pageOptions !== null) {
      return {
        size: 'small',
        current: pageData.pageNo || pageNo,
        pageSize: pageData.pageSize || pageSize,
        total: pageData.total || total,
        defaultCurrent: 1,
        pageSizeOptions: pageSizeOptions || ['10', '20', '30', '50'],
        showSizeChanger: true,
        onChange: onPageChange,
        onShowSizeChange: onPageChange,
        hideOnSinglePage: false,
        showQuickJumper: true,
        showTotal: t => `共${t || 0}条`,
      };
    }
    return false;
  }, [pageNo, pageSize, total, onFetch, pageData]);

  // 生命周期：加载dom前执行一次
  useEffect(() => {
    // 是否立即请求
    if (immediate) {
      fetch({ ...saerchData, pageNo, pageSize });
    }
    return () => {
      if (onDestroy) onDestroy();
    };
  }, []);

  // 当不用可控制SearchList的时候，直接用这个就好了
  const onAutoSearch = useCallback(
    async (newSearchData?: T) => {
      const data = newSearchData ? { ...saerchData, ...newSearchData } : saerchData;
      await fetch({ pageSize: pagination ? pagination.pageSize : 20, pageNo: 1, ...data });
      if (newSearchData) setSearchData(data);
    },
    [saerchData, pagination],
  );

  return {
    pagination,
    onAutoSearch,
    saerchData,
  };
}
