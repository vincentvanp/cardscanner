import { Header } from "antd/lib/layout/layout";

function ScannerHeader(){
    return(
        <Header className="container--header">
            <p className="text--header-title">Studentenkaart scanner</p>
            {/* <div className="container--verified">
                <img src="../../images/check.svg" alt="verefied check mark"/>
                <p className="text--header-verefied">Geverifieerde account</p>
            </div> */}
        </Header>
    );
}

export default ScannerHeader;