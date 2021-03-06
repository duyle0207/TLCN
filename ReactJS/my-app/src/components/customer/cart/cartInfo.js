import React, { Component } from 'react';
import '../../../css/style.css';
import InfoCartCustomer from './infoCartCustomer';
import { withRouter } from 'react-router';
import PaypalCheckoutButton from '../../PaypalCheckoutButton';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';
import Modal from 'react-awesome-modal';

const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });


class cartInfo extends Component {

    hoaDon = {
        "id": '',
        "khachHang": '',
        "tenKH": "",
        "diaChi": "",
        "soDT": "",
        "ngayMuaHang": "",
        "tongTien": '',
        "phuongThucThanhToan": 1,
        "ten": "",
        "email": "",
        "note": ""
    }

    constructor(props) {
        super(props);
        // console.log(JSON.parse(localStorage.getItem("userInfo")));

        this.state = ({
            visibleInfoCus: false,
            cartQuantity: 0,
            amount: 0,
            pttt: '',
            hoaDon: {
                id: '',
                khachHang: {},
                tenKH: "",
                diaChi: "",
                soDT: "",
                ngayMuaHang: this.getCurrentDate(),
                tongTien: '',
                phuongThucThanhToan: {
                    id: "",
                    tenPhuongThucThanhToan: ""
                },
                ten: "",
                email: "",
                note: ""
            },
            isCheckoutOnline: false,
            order: {
                customer: 'Test',
                total: 0,
                items: [
                ]
            },
            isLoggedIn: false,
            visible: false,
            notificationContent: '',
            iconNotification: ''
        });

        this.handleInfoCus = this.handleInfoCus.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.saveHoaDon = this.saveHoaDon.bind(this);
        this.payment = this.payment.bind(this);
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        }, () => {
            this.props.history.push("/");
        });
    }

    getCurrentDate() {
        var d = new Date();

        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = d.getFullYear();

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // var dateTime = date+' '+time;

        // console.log();

        return String(yyyy + '-' + mm + '-' + dd);
    }

    items = [];

    async componentWillMount() {
        if (JSON.parse(localStorage.getItem("userInfo")) === null) {
            localStorage.setItem("userInfo", JSON.stringify({}));
        }
        if (Object.keys(JSON.parse(localStorage.getItem("userInfo"))).length === 0) {
            this.setState({ isLoggedIn: false }, () => {
                console.log(this.state.isLoggedIn);
            });
        }
        else {
            this.setState({ isLoggedIn: true }, () => {
                console.log(this.state.isLoggedIn);
            });
        }
    }

    async componentDidMount() {

        console.log(this.props.cartLines);

        const cartQuantity = await (await fetch(`/customerUnauthenticated/getAllQuantity`)).json();
        const amount = await (await fetch(`/customerUnauthenticated/getAmount`)).json();
        this.setState({
            cartQuantity: cartQuantity,
            amount: amount
        });
        if (JSON.parse(localStorage.getItem("userInfo")).userName) {
            const customer = await (await fetch(`/customerUnauthenticated/getCustomerByUsername/${JSON.parse(localStorage.getItem("userInfo")).userName}`)).json();
            this.setState({
                hoaDon: {
                    ...this.state.hoaDon,
                    khachHang: customer,
                    ten: customer.ten,
                    email: customer.email,
                    soDT: customer.soDT,
                    diaChi: customer.diaChi
                }
            });
        }

        // console.log(this.props.cartLines);

        console.log(this.items);
        this.props.cartLines.forEach(element => {
            var item = {
                name: '',
                description: 'Test',
                quantity: 0,
                price: '',
                tax: '0.02',
                sku: 'product',
                currency: 'USD'
            };

            item['name'] = element.sanPham.tenSP;
            item['quantity'] = element.soLuong;
            item['price'] = (element.tongTien / 23000).toFixed(2);

            this.items.push(item);
        });

        // console.log(this.items);
        this.setState({
            order: {
                customer: '1',
                total: (this.state.amount / 23000).toFixed(2),
                items: this.items
            }
        }, () => {
            console.log(this.state.order);
        })
    }

    async handleOnChange(event) {

        if (event.target.id === "customRadio2") {
            var hd = this.state.hoaDon;
            hd['phuongThucThanhToan'] = 2;
            this.setState({ isCheckoutOnline: true, hoaDon: hd });
        }
        else {
            if (event.target.id === "customRadio1") {
                var hd = this.state.hoaDon;
                hd['phuongThucThanhToan'] = 1;
                this.setState({ isCheckoutOnline: false, hoaDon: hd });
            }
            else {
                var hd = this.state.hoaDon;
                hd[event.target.name] = event.target.value;
                this.setState({ hoaDon: hd });
            }
        }

        console.log(this.state.hoaDon);
    }

    async checkOutOnline() {
        if (this.checkAuth()) {
            const customer = await (await fetch(`/customerUnauthenticated/getCustomerByUsername/${JSON.parse(localStorage.getItem("userInfo")).userName}`)).json();
            const pttt = await (await fetch(`/customerUnauthenticated/getPhuongThucThanhToan/${this.state.hoaDon.phuongThucThanhToan}`)).json();
            this.setState({
                hoaDon: {
                    ...this.state.hoaDon,
                    khachHang: customer,
                    phuongThucThanhToan: pttt,
                    tongTien: this.state.amount
                }
            });
            console.log(this.state.hoaDon);
            await fetch(`/customerUnauthenticated/saveHoaDon`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.hoaDon)
            }).then((res) => {
                this.setState({
                    notificationContent: 'Đặt hàng thành công',
                    iconNotification: 'ml-4 fa fa-check-circle',
                    visible: true
                })
            });
        }
        else {
            // alert("Đăng nhập để thực hiện thanh toán");
            this.props.history.push("/login");
        }
    }

    async saveHoaDon(event) {
        event.preventDefault();
        if (this.checkAuth()) {
            //Check Cart quantity
            const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("userInfo")).accessToken}`)).json();
            if (!isTokenValid) {
                await fetch(`/customerUnauthenticated/logout`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                localStorage.removeItem("userInfo");
                this.props.history.push('/login?message=tokenexpired');
            }
            else {
                const removedProductFromCart = await (await fetch(`/customerUnauthenticated/checkCartQuantityBeforeCheckOut`)).json();
                if (removedProductFromCart.length === 0) {
                    const customer = await (await fetch(`/customerUnauthenticated/getCustomerByUsername/${JSON.parse(localStorage.getItem("userInfo")).userName}`)).json();
                    const pttt = await (await fetch(`/customerUnauthenticated/getPhuongThucThanhToan/${this.state.hoaDon.phuongThucThanhToan}`)).json();
                    this.setState({
                        hoaDon: {
                            ...this.state.hoaDon,
                            khachHang: customer,
                            phuongThucThanhToan: pttt,
                            tongTien: this.state.amount
                        }
                    });
                    console.log(this.state.hoaDon);
                    await fetch(`/customerUnauthenticated/saveHoaDon`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.state.hoaDon)
                    }).then((res) => {
                        this.setState({
                            notificationContent: 'Đặt hàng thành công',
                            iconNotification: 'ml-4 fa fa-check-circle',
                            visible: true
                        });
                        // this.props.history.push("/")
                    });
                }
                else {
                    this.setState({
                        notificationContent: 'Một vài sản phẩm trong giỏ hàng đã hết hàng. Xin lỗi vì sự bất tiện này!',
                        iconNotification: 'ml-4 fa fa-remove',
                        visible: true
                    })
                }
            }
        }
        else {
            // alert("Đăng nhập để thực hiện thanh toán");
            this.props.history.push("/login");
        }
    }

    check() {
        alert("Test Paypal");
    }

    checkAuth() {
        if (JSON.parse(localStorage.getItem("userInfo")) === null) {
            localStorage.setItem("userInfo", JSON.stringify({}));
        }
        if (Object.keys(JSON.parse(localStorage.getItem("userInfo"))).length === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    handleInfoCus() {
        this.setState({ visibleInfoCus: !this.state.visibleInfoCus })
    }

    //Check out
    paypalConf = {
        currency: 'USD',
        env: 'sandbox',
        client: {
            sandbox: 'AbKP2tVAmb6-KKd8DQsPpkeUiEW3YjcdnCyib-i5RVMtDfxNemnsyq9s6hkhOosRAV6jvBxRaeZ89W8O',
            production: '-- id--',
        },
        style: {
            label: 'checkout',
            size: 'large',
            shape: 'pill',
            color: 'gold',
            layout: 'horizontal',
        }
    };

    payment = async (data, actions) => {
        const removedProductFromCart = await (await fetch(`/customerUnauthenticated/checkCartQuantityBeforeCheckOut`)).json();
        if (removedProductFromCart.length === 0) {
            const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("userInfo")).accessToken}`)).json();
            if (!isTokenValid) {
                await fetch(`/customerUnauthenticated/logout`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                localStorage.removeItem("userInfo");
                this.props.history.push('/login?message=tokenexpired');
            }
            else {
                const payment = {
                    "intent": "sale",
                    "redirect_urls": {
                        "return_url": "https://www.paypal.com",
                        "cancel_url": "https://www.paypal.com"
                    },
                    "payer": {
                        "payment_method": "paypal"
                    },
                    transactions: [
                        {
                            "amount": {
                                "total": this.state.order.total,
                                "currency": "USD",
                            },
                            "description": "The payment transaction description.",
                            "custom": "EBAY_EMS_90048630024435",
                        }
                    ],
                    note_to_payer: 'Contact us for any questions on your order.'
                };
                return actions.payment.create({ payment });
            }
        }
        else {
            this.setState({
                notificationContent: 'Một vài sản phẩm trong giỏ hàng đã hết hàng. Xin lỗi vì sự bất tiện này!',
                iconNotification: 'ml-4 fa fa-remove',
                visible: true
            })
        }
    };

    onAuthorize = (data, actions) => {
        return actions.payment.execute()
            .then(response => {
                // alert(`onAuthorize: ${response.id}`);
                this.checkOutOnline();
            })
            .catch(error => {
                console.log(error);
                alert("Error")
            });
    };

    onError = (error) => {
        console.log(error);
    };

    onCancel = (data, actions) => {
        alert("Cancel");
    };

    render() {

        return (
            <div className="container">
                <Modal visible={this.state.visible} width="400" height="200" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                    <div className="text-center">
                        <div className="" >
                            <div className="toast-header">
                                <strong className="mr-auto">Thông báo</strong>
                                {/* <small>11 mins ago</small> */}
                                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                    {/* <span aria-hidden="true" ></span> */}
                                    <a className="text-decoration-none text-dark" href="javascript:void(0);" onClick={() => this.closeModal()}>&times;</a>
                                </button>
                            </div>
                            <div className="toast-body">
                                <div className="row mt-4">
                                    <div className="col-sm-3">

                                        <i className={this.state.iconNotification} style={{ color: '#70AC3C', 'fontSize': '60px' }}></i>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="h5 mt-3 mx-3 mb-4 text-justify">{this.state.notificationContent}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <h1><span className="badge badge-warning my-4">Thông báo</span></h1> */}

                    </div>
                </Modal>
                <form onSubmit={this.saveHoaDon}>
                    <div className="row">
                        <div className="col-sm-8">
                            <nav class="navbar navbar-light bg-light mt-4">
                                <span class="navbar-brand mb-0 h1">
                                    THÔNG TIN KHÁCH HÀNG
                            </span>
                            </nav>
                            <div className="col-sm-12">
                                <div className="mt-4">
                                    <InfoCartCustomer hoaDon={this.state.hoaDon} handleOnChange={this.handleOnChange}></InfoCartCustomer>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <nav class="navbar navbar-light bg-light mt-4">
                                <span class="navbar-brand mb-0 h1">
                                    PHƯƠNG THỨC THANH TOÁN
                                </span>
                            </nav>
                            {/* <div class="form-check mx-4 my-4">
                                <input className="form-check-input shadow-none" width="50px" height="50px"
                                    type="radio" name="tructuyen" onChange={this.handleOnChange} id="exampleRadios1" value="1" required />
                                <p className="h6 form-check-label" for="exampleRadios1" >
                                    Thanh toán tiền mặt khi nhận hàng
                            </p>
                            </div>
                            <div className="form-check mx-4 my-4">
                                <input className="form-check-input shadow-none" width="50px" height="50px" type="radio" name="online" onChange={this.handleOnChange} id="exampleRadios2" value="2" required />
                                <p className="h6 form-check-label" for="exampleRadios2">
                                    Thanh toán trực tuyến
                            </p>
                            </div> */}
                            <div className="custom-control custom-radio my-4">
                                <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" onChange={this.handleOnChange} required />
                                <label className="custom-control-label" htmlFor="customRadio1">
                                    <p className="h6 form-check-label" htmlFor="exampleRadios1" >
                                        Thanh toán tiền mặt khi nhận hàng
                                    </p>
                                </label>
                            </div>
                            <div className="custom-control custom-radio my-4">
                                <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" onChange={this.handleOnChange} />
                                <label className="custom-control-label" htmlFor="customRadio2">
                                    <p className="h6 form-check-label" htmlFor="exampleRadios1" >
                                        Thanh toán trực tuyến
                                    </p>
                                </label>
                            </div>
                            <div className="row ml-2">
                                <div className="col-sm-6">
                                    <p className="info-cart">Tổng sản phẩm:</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="total-cart">
                                        {this.state.cartQuantity}
                                    </p>
                                </div>
                            </div>
                            <div className="row ml-2">
                                <div className="col-sm-6">
                                    <p className="info-cart">Thành tiền</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="h4 total-cart text-danger">
                                        {(this.state.amount).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                    </p>
                                </div>
                            </div>
                            {this.state.isLoggedIn ?
                                <div className="row mt-2">
                                    {/* <div className="col-sm-"></div> */}
                                    <div className="col-sm-12 mt-4">
                                        {this.state.isCheckoutOnline ?
                                            <PayPalButton
                                                env={this.paypalConf.env}
                                                client={this.paypalConf.client}
                                                payment={(data, actions) => this.payment(data, actions)}
                                                onAuthorize={(data, actions) => this.onAuthorize(data, actions)}
                                                onCancel={(data, actions) => this.onCancel(data, actions)}
                                                onError={(error) => this.onError(error)}
                                                style={this.paypalConf.style}
                                                commit
                                                locale="en_US"
                                            /> :
                                            <button type="submit" className="btn btn-danger"
                                                style={{ width: '100%' }}>
                                                Thanh toán
                                            </button>
                                        }
                                    </div>
                                </div>
                                :
                                <div className="row mt-2 text-center">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-8">
                                        <div className="badge badge-warning text-wrap mt-2" style={{ fontSize: 18 }}>
                                            Đăng nhập để thực hiện thanh toán bạn nhé!
                                        </div>
                                    </div>
                                    <div className="col-sm-2"></div>
                                </div>
                            }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(cartInfo);