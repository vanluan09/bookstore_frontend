import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../services/ProductService';

const usePaginate = (initialState) => {
    const [paginate, setPaginate] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const { state } = useLocation();
    const [productTypes, setProductTypes] = useState({});

    const options = [
        {
          value: 'sortName',
          label: 'Thứ tự từ A - Z',
        },
        {
          value: 'New',
          label: 'Mới nhất',
        },
        {
          value: 'sortPriceDown',
          label: 'Thứ tự theo giá: từ cao xuống thấp',
        },
        {
          value: 'sortPriceUp',
          label: 'Thứ tự theo giá: từ thấp lên cao',
        },
    ]

    const ChangeSelect = (value) => {
        let sort = ''
        let valued = ''
        const selectedValue = value.value

        if (selectedValue === 'sortName') {
            sort = 'asc';
            valued = 'name';

        } else if (selectedValue === 'sortPriceDown') {
            sort = 'desc';
            valued = 'price';

        } else if (selectedValue === 'sortPriceUp') {
            sort = 'asc';
            valued = 'price';

        }


        setPaginate({ ...paginate, sort, valued });
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await ProductService.getProductType(
                state,
                paginate.limit,
                paginate.page,
                paginate.sort,
                paginate.valued
            );
            console.log('res', res);
            if (res?.status === 'OK') {
                setProductTypes({ [state]: res.data });
                setPaginate((prevPaginate) => ({
                    ...prevPaginate,
                    total: res?.total,
                }));
            }
            setLoading(false);
        };

        fetchData();
    }, [state, paginate.page, paginate.limit, paginate.sort, paginate.valued]);

    const onChange = (current, pageSize) => {
        setPaginate({ ...paginate, page: current - 1, limit: pageSize });
    };

    return { paginate, onChange, ChangeSelect, loading, productTypes, options };
};

export default usePaginate;
