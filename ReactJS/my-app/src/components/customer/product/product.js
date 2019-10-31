import React, { Component } from 'react';
import Filter from '../filter/filter';
import FilterItem from '../filter/filterItem';
import FilterDetail from '../filter/filterDetail';
import Item from '../item/item';
import Header from "../dashboard/header";
import Footer from "../dashboard/footer";
import Pagination from "../../Pagination";

var filter = {
    thuongHieus: [],
    maus: [],
    heDieuHanhs: [],
    rams: [],
    cpus: [],
    oCungs: [],
    vgas: [],
    nhuCaus: [],
};

var holder = [];

const listMau = ['Đen', 'Bạc', 'Xám', 'Vàng'];
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            currentProducts: [],
            thuongHieus: [],
            heDieuHanhs: [],
            rams: [],
            cpus: [],
            oCungs: [],
            vgas: [],
            nhuCaus: [],
            price: [0, 100],
            active: false
        }
        this.onPriceUpdate = this.onPriceUpdate.bind(this);
        this.onChildUpdate = this.onChildUpdate.bind(this);
        this.filterThuongHieu = this.filterThuongHieu.bind(this);
        this.filterPrice = this.filterPrice.bind(this);
    }

    async componentDidMount() {
        const list = await (await fetch(`/hung/sanPham`)).json();
        this.setState({ products: list });
        holder = list;
        const listThuongHieu = await (await fetch("/hung/listThuongHieu")).json();
        this.setState({ thuongHieus: listThuongHieu });
        const listHDH = await (await fetch("/hung/listHeDieuHanh")).json();
        this.setState({ heDieuHanhs: listHDH });
        const listRAM = await (await fetch("/listRam")).json();
        this.setState({ rams: listRAM });
        const listCPU = await (await fetch("/listCPU")).json();
        this.setState({ cpus: listCPU });
        const listOCung = await (await fetch("/listOCung")).json();
        this.setState({ oCungs: listOCung });
        const listVGA = await (await fetch("hung/cardDoHoa")).json();
        this.setState({ vgas: listVGA });
        const listNhuCau = await (await fetch("/listNhuCauSuDung")).json();
        this.setState({ nhuCaus: listNhuCau });
    }

    onPageChanged = data => {
        const offset = (data.currentPage - 1) * data.pageLimit;
        const currentProducts = this.state.products.slice(offset, offset + data.pageLimit);
        this.setState({
            currentProducts: currentProducts,
        });
        console.log(data);
    }

    onPriceUpdate(childState) {
        this.setState({ price: childState });
        console.log(this.state.price);
        this.setState({ products: this.filter() });
    }

    onChildUpdate(childState) {
        if (childState.active) {
            switch (childState.wrapper) {
                case "thuongHieu":
                    filter.thuongHieus.push(childState.value)
                    break;
                case "mau":
                    filter.maus.push(childState.value)// code block
                    break;
                case "heDieuHanh":
                    filter.heDieuHanhs.push(childState.value)
                    break;
                case "ram":
                    filter.rams.push(childState.value)// code block
                    break;
                case "cpu":
                    filter.cpus.push(childState.value)
                    break;
                case "oCung":
                    filter.oCungs.push(childState.value)// code block
                    break;
                case "vga":
                    filter.vgas.push(childState.value)
                    break;
                case "nhuCau":
                    filter.nhuCaus.push(childState.value)// code block
                    break;
            }
        } else {
            switch (childState.wrapper) {
                case "thuongHieu":
                    var index = filter.thuongHieus.indexOf(childState.value);
                    if (index !== -1) filter.thuongHieus.splice(index, 1);
                    break;
                case "mau":
                    index = filter.maus.indexOf(childState.value);
                    if (index !== -1) filter.maus.splice(index, 1);
                    break;
                case "heDieuHanh":
                    index = filter.heDieuHanhs.indexOf(childState.value);
                    if (index !== -1) filter.heDieuHanhs.splice(index, 1);
                    break;
                case "ram":
                    index = filter.rams.indexOf(childState.value);
                    if (index !== -1) filter.rams.splice(index, 1);
                    break;
                case "cpu":
                    index = filter.cpus.indexOf(childState.value);
                    if (index !== -1) filter.cpus.splice(index, 1);
                    break;
                case "oCung":
                    index = filter.oCungs.indexOf(childState.value);
                    if (index !== -1) filter.oCungs.splice(index, 1);
                    break;
                case "vga":
                    index = filter.vgas.indexOf(childState.value);
                    if (index !== -1) filter.vgas.splice(index, 1);
                    break;
                case "nhuCau":
                    index = filter.nhuCaus.indexOf(childState.value);
                    if (index !== -1) filter.nhuCaus.splice(index, 1);
                    break;
            }
        }
        console.log(filter.thuongHieus);
        console.log(holder);
        this.setState({ products: this.filter() });
    }

    filter() {
        return this.filterMau(
            this.filterThuongHieu(
                this.filterPrice(
                    this.filterHeDieuHanh(
                        this.filterRAM(
                            this.filterCPU(
                                this.filterOCung(
                                    this.filterVGA(
                                        this.filterNhuCau(holder)
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }

    filterPrice(array) {
        let result = [];
        array.forEach(element => {
            if ((element.gia) >= (this.state.price[0] * 1000000) && (element.gia) <= (this.state.price[1] * 1000000))
                result.push(element);
        })
        return result;
    }

    filterThuongHieu(array) {
        let result = [];
        if (filter.thuongHieus.length === 0) {
            result = array;
            return result;
        }
        array.forEach(element => {
            filter.thuongHieus.forEach(item => {
                if (element.thuongHieu.tenThuongHieu === item)
                    result.push(element);
            })
        })
        return result;
    }

    filterHeDieuHanh(array) {
        let result = [];
        if (filter.heDieuHanhs.length === 0) {
            result = array;
            return result;
        }
        array.forEach(element => {
            filter.heDieuHanhs.forEach(item => {
                if (element.heDieuHanh.tenHeDieuHanh === item)
                    result.push(element);
            })
        })
        return result;
    }

    filterMau(array) {
        let result = [];
        if (filter.maus.length === 0) {
            result = array;
            return result;
        }
        array.forEach(element => {
            filter.maus.forEach(item => {
                if (element.mauSac === item)
                    result.push(element);
            })
        })
        return result;
    }

    filterRAM(array) {
        let result = [];
        if (filter.rams.length === 0) {
            result = array;
            return result;
        }
        array.forEach(element => {
            filter.rams.forEach(item => {
                if (`${element.ram.boNhoRAM}GB ${element.ram.loaiRAM}` === item)
                    result.push(element);
            })
        })
        return result;
    }

    filterCPU(array) {
        let result = [];
        if (filter.cpus.length === 0) {
            result = array;
            return result;
        }
        array.forEach(element => {
            filter.cpus.forEach(item => {
                if (element.cpu.tenCPU === item)
                    result.push(element);
            })
        })
        return result;
    }

    filterOCung(array) {
        let result = [];
        if (filter.oCungs.length === 0) {
            result = array;
            return result;
        }
        array.forEach(element => {
            filter.oCungs.forEach(item => {
                if (element.oCung.tenOCung === item)
                    result.push(element);
            })
        })
        return result;
    }

    filterVGA(array) {
        let result = [];
        if (filter.vgas.length === 0) {
            result = array;
            return result;
        }
        array.forEach(element => {
            filter.vgas.forEach(item => {
                if (element.cardDoHoa.tenCardDoHoa === item)
                    result.push(element);
            })
        })
        return result;
    }

    filterNhuCau(array) {
        let result = [];
        if (filter.nhuCaus.length === 0) {
            result = array;
            return result;
        }
        array.forEach(element => {
            filter.nhuCaus.forEach(item => {
                if (element.nhuCauSuDung.tenNhuCauSuDung === item)
                    result.push(element);
            })
        })
        return result;
    }

    render() {
        const myRecords = this.state.products.length;
        console.log(myRecords);
        if (myRecords === 0) return null;
        return (
            <div>
                <Header />
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-sm-2">
                            <Filter onUpdate={(state) => this.onPriceUpdate(state)}>
                                <FilterItem filterName={'Thương hiệu'} collapseId='thuongHieu'>
                                    <div className="collapse show" id="thuongHieu">
                                        {this.state.thuongHieus.map((item, index) => {
                                            return <FilterDetail
                                                itemName={item.tenThuongHieu}
                                                key={index}
                                                wrapper={'thuongHieu'}
                                                onUpdate={(state) => this.onChildUpdate(state)}
                                            />
                                        })}
                                    </div>
                                </FilterItem>
                                <FilterItem filterName={'Màu sắc'} collapseId='mau'>
                                    <div className="collapse show" id="mau">
                                        {listMau.map((item, index) => {
                                            return <FilterDetail
                                                itemName={item}
                                                key={index}
                                                wrapper={'mau'}
                                                onUpdate={(state) => this.onChildUpdate(state)}
                                            />
                                        })}
                                    </div>
                                </FilterItem>
                                <FilterItem filterName={'Hệ điều hành'} collapseId='heDieuHanh'>
                                    <div className="collapse show" id="heDieuHanh">
                                        {this.state.heDieuHanhs.map((item, index) => {
                                            return <FilterDetail
                                                itemName={item.tenHeDieuHanh}
                                                key={index}
                                                wrapper={'heDieuHanh'}
                                                onUpdate={(state) => this.onChildUpdate(state)}
                                            />
                                        })}
                                    </div>
                                </FilterItem>
                                <FilterItem filterName={'Bộ nhớ RAM'} collapseId='ram'>
                                    <div className="collapse show" id="ram">
                                        {this.state.rams.map((item, index) => {
                                            return <FilterDetail
                                                itemName={`${item.boNhoRAM}GB ${item.loaiRAM}`}
                                                key={index}
                                                wrapper={'ram'}
                                                onUpdate={(state) => this.onChildUpdate(state)}
                                            />
                                        })}
                                    </div>
                                </FilterItem>
                                <FilterItem filterName={'Bộ vi xử lý'} collapseId='cpu'>
                                    <div className="collapse show" id="cpu">
                                        {this.state.cpus.map((item, index) => {
                                            return <FilterDetail
                                                itemName={item.tenCPU}
                                                key={index}
                                                wrapper={'cpu'}
                                                onUpdate={(state) => this.onChildUpdate(state)}
                                            />
                                        })}
                                    </div>
                                </FilterItem>
                                <FilterItem filterName={'Ổ đĩa cứng'} collapseId='oCung'>
                                    <div className="collapse show" id="oCung">
                                        {this.state.oCungs.map((item, index) => {
                                            return <FilterDetail
                                                itemName={item.tenOCung}
                                                key={index}
                                                wrapper={'oCung'}
                                                onUpdate={(state) => this.onChildUpdate(state)}
                                            />
                                        })}
                                    </div>
                                </FilterItem>
                                <FilterItem filterName={'Card màn hình'} collapseId='vga'>
                                    <div className="collapse show" id="vga">
                                        {this.state.vgas.map((item, index) => {
                                            return <FilterDetail
                                                itemName={item.tenCardDoHoa}
                                                key={index}
                                                wrapper={'vga'}
                                                onUpdate={(state) => this.onChildUpdate(state)}
                                            />
                                        })}
                                    </div>
                                </FilterItem>
                                <FilterItem filterName={'Nhu cầu sử dụng'} collapseId='nhuCau'>
                                    <div className="collapse show" id="nhuCau">
                                        {this.state.nhuCaus.map((item, index) => {
                                            return <FilterDetail
                                                itemName={item.tenNhuCauSuDung}
                                                key={index}
                                                wrapper={'nhuCau'}
                                                onUpdate={(state) => this.onChildUpdate(state)}
                                            />
                                        })}
                                    </div>
                                </FilterItem>
                            </Filter>
                        </div>
                        <div className="col-sm-10">
                            <div className="col-sm-2  ml-auto pr-0">
                                <div className="form-group">
                                    <select className="form-control form-control-sm" id="exampleFormControlSelect1">
                                        <option>Mới nhất</option>
                                        <option>Giá giảm dần</option>
                                        <option>Giá tăng dần</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                {this.state.products.length < 1 &&
                                    <div className="alert alert-secondary col-12 text-center" role="alert">
                                        Không tìm thấy sản phẩm nào phù hợp
                                    </div>
                                }
                                {this.state.currentProducts.map((item, index) => {
                                    return <Item
                                        id={item.id}
                                        imgSrc={item.hinh}
                                        brand={item.thuongHieu.tenThuongHieu}
                                        lapName={item.tenSP}
                                        price={item.gia}
                                        key={index}
                                    />
                                })}
                            </div>
                            <Pagination totalRecords={myRecords} pageLimit={2} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Product;