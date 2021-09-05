import { CButton } from '@coreui/react';
import JsBarcode from 'jsbarcode';
import React, { useEffect, useRef } from 'react'
import ReactToPrint from "react-to-print";

function BarCode({ ProductBarcode, name, price, setBarCodePrinted }) {

    const [Barcode, setBarcode] = React.useState("")

    useEffect(() => {
        JsBarcode("#itf-14-barcode", ProductBarcode, { format: "CODE128" });
    }, [])

    // function makeid(length) {
    //     var result           = '';
    //     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     var charactersLength = characters.length;
    //     for ( var i = 0; i < length; i++ ) {
    //       result += characters.charAt(Math.floor(Math.random() * 
    //  charactersLength));
    //    }
    //    return result;
    // }

    const componentRef = useRef();

    return (
        <div>
            <div ref={componentRef} className="barcode-reciept">
                <p className="font-weight-bold text-capitalize text font-2xl">{name}</p>
                <p className="font-weight-bold text-capitalize text font-2xl">Rs. {price}</p>
                <svg id="itf-14-barcode"></svg>
            </div>
            <ReactToPrint
                onAfterPrint={() => setBarCodePrinted && setBarCodePrinted(true)}
                onPrintError={() => setBarCodePrinted && setBarCodePrinted(true)}
                trigger={() => <CButton className="btn btn-primary ml-1 mt-2 mr-3">Print</CButton>}
                content={() => componentRef.current}
            />
        </div>
    )
}

export default BarCode
