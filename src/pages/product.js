import React from "react";
import Container from "../components/containers/container";
import ContainerWithaside from "../components/containers/container-withaside";
//import Cotizador from "../components/cotizador-component/cotizador";
import { Spacing } from "../components/generals/spacing/spacing";
import Spiner from "../components/generals/spiner/spiner";
import NoProducts from "../components/no-products/no-products";
import ProductComponent from "../components/product-component/product-component";
import { GetMethod } from "../utils/peticiones/request";

const Product = (props) => {

    const thisUrl = props.match.params.url;
    const [product, setProduct] = React.useState({});
    const [load, setLoad] = React.useState(true);


    const getProduct = React.useCallback(()=>{
        const getThisProduct = async () =>{
            const res = await GetMethod(`products?url_containss=${thisUrl}`);
            if(res.ok){
                if(res.response.data.length === 0){
                    setProduct([]);
                    setLoad(false);
                }else{
                    setProduct(res.response.data[0]);
                    setLoad(false);
                }
            }else{
                setLoad(false);
            }
        }
        getThisProduct();
    },[thisUrl])

    React.useEffect(()=>{ getProduct() },[getProduct]);

    if(load){
        return <Spiner/>
    }
    
    return (  
        <>
        <Spacing/>
        <Container>
        {product.length === 0 ?
            <NoProducts/>
            :
            <ContainerWithaside
            relation={0}
            body={<ProductComponent product={product}/>}
            aside={null}
            />
        }   
        </Container>
        </>
    );
}
 
export default Product;