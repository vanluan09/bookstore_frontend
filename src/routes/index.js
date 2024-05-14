import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import Books from "../pages/TypeProductPage/Books";
import Clothes from "../pages/TypeProductPage/Clothes";
import Liturgical from "../pages/TypeProductPage/Liturgical";
import Pictures from "../pages/TypeProductPage/Pictures";
import KeepSakes from "../pages/TypeProductPage/KeepSakes";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import MyOrderPage from "../pages/MyOrder/MyOrder";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import ForgotPassword from "../pages/ForgotPasswordPage/ForgotPassword";
import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";

import ResetPassword from "../pages/ResetPasswordPage/ResetPassword";
import PrayerRoomPage from "../pages/PrayerRoomPage/PrayerRoomPage";
import RoomPage from "../pages/RoomPage/RoomPage";
import ReadBookFree from "../pages/RoomPage/ReadBookFree";


export const routes = [
    {
        path : '/',
        page : HomePage,
        isShowHeader : true
    },
    {
        path : '/search',
        page : SearchPage,
        isShowHeader : true
    },

    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: false
    },

    {
        path : '/Sach',
        page : Books,
        isShowHeader : true
    },
    {
        path : '/Sach/:type',
        page : Books,
        isShowHeader : true
    },
    {
        path : '/Đo_phung_tu',
        page : Liturgical,
        isShowHeader : true
    },
    {
        path : '/Đo_phung_tu/:type',
        page : Liturgical,
        isShowHeader : true
    },
    {
        path : '/Tranh_anh',
        page : Pictures,
        isShowHeader : true
    },
    {
        path : '/Tranh_anh/:type',
        page : Pictures,
        isShowHeader : true
    },
    {
        path : '/Pham_phuc',
        page : Clothes,
        isShowHeader : true
    },
    {
        path : '/Pham_phuc/:type',
        page : Clothes,
        isShowHeader : true
    },
    {
        path : '/Đo_luu_niem',
        page : KeepSakes,
        isShowHeader : true
    },
    {
        path : '/Đo_luu_niem/:type',
        page : KeepSakes,
        isShowHeader : true
    },

    {
        path : '/product-details/:id',
        page : ProductDetailsPage,
        isShowHeader : true
    },

    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivated: true
    },

    {
        path: '/phong-cau-nguyen',
        page: PrayerRoomPage,
        isShowHeader: true
    },
    {
        path: '/phong-cau-nguyen/maria',
        page: RoomPage,
        isShowHeader: false
    },
    {
        path: '/phong-cau-nguyen/maria/pray/:id',
        page: ReadBookFree,
        isShowHeader: false
    },
    {
        path: '/phong-cau-nguyen/body_of_Chirst',
        page: RoomPage,
        isShowHeader: false
    },
    {
        path: '/phong-cau-nguyen/body_of_Chirst/pray/:id',
        page: ReadBookFree,
        isShowHeader: false
    },
    {
        path: '/phong-cau-nguyen/Thanh_gia',
        page: RoomPage,
        isShowHeader: false
    },
    {
        path: '/phong-cau-nguyen/Thanh_gia/pray/:id',
        page: ReadBookFree,
        isShowHeader: false
    },

    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },

    {
        path: '/forgotPassword',
        page: ForgotPassword,
        isShowHeader: false
    },
    {
        path: '/resetPassword/:id/:token',
        page: ResetPassword,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },



    {
        path : '*',
        page : NotFoundPage
    }
]