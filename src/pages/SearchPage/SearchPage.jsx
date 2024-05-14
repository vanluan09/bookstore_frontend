import React, { useState, useEffect } from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import * as ProductService from '../../services/ProductService';
import { WrapperButtonComponent, WrapperSpan } from './style';
import Loading from '../../components/LoadingComponent/Loading';

const SearchPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500);
    const [limit, setLimit] = useState(4);
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Nếu searchProduct là null hoặc 0, setLimit về 0
        if (!searchProduct) {
            setLimit(0);
            return;
        }
    
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const res = await ProductService.getAllProduct(searchDebounce, limit);
                console.log('dáta', res.data)
                setProducts(res?.data);
                if (res?.data?.length === 0) {
                    const response = await ProductService.getProductSearchType(searchDebounce, limit);
                    setProducts(response.data);
                    if(response?.data?.length === 0) {
                        const response = await ProductService.getProductDesc(searchDebounce, limit);
                        setProducts(response.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        // Chỉ gọi API khi searchDebounce có giá trị hợp lệ
        if (searchDebounce !== undefined && searchDebounce !== '') {
            fetchProducts();
        }
    }, [searchDebounce, limit]);
    

    return (
        <div>
            <TypeProduct name={'Tìm kiếm'} type={'Tìm kiếm'} />

            <Loading isLoading={isLoading}>
                <WrapperSpan>Tìm thấy {products?.length} kết quả với từ khoá "{searchProduct}"</WrapperSpan>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '36px', alignItems: 'center', margin: '40px 100px', justifyContent:'center' }}>
                    {products?.map((product) => (
                        <CardComponent
                            key={product._id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            type={product.type}
                            description={product.description}
                            discount={product.discount}
                            countInStock={product.countInStock}
                            id = {product._id}
                        />
                    ))}
                </div>

                <WrapperButtonComponent
                    textButton={'Xem thêm'}
                    styletextbutton={{ fontSize: '24px', color: '#fff' }}
                    styleButton={{ margin: '0 auto 40px', display: 'block', background: '#DC2129', border: 'none', height: 'auto', width: 'auto', borderRadius: '12px' }}
                    onClick={() => setLimit((prev) => prev + 4)}
                />
            </Loading>
        </div>
    );
};

export default SearchPage;
