var SystemParam = {
    navActive: "nav-item active",
    fanOn: "Quạt đang mở",
    fanOff: "Quạt đang tắt",
    lightOn: "Đèn đang mở",
    lightOff: "Đèn đang tắt",
    phongKhach: "Phòng khách",
    phongNgu: "Phòng ngủ",
    phongBep: "Phòng bếp",
};
var firebaseConfig = {
    apiKey: "AIzaSyA2mrZGTviNJepI4qcAoS8IdMftAJ_zlYU",
    authDomain: "datn-768db.firebaseapp.com",
    databaseURL: "https://datn-768db.firebaseio.com",
    projectId: "datn-768db",
    storageBucket: "datn-768db.appspot.com",
    messagingSenderId: "416447379041",
    appId: "1:416447379041:web:75f70db1890a4fcbd1dc20",
    measurementId: "G-GWGJXZW2GX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
var database = firebase.database();

function Phong(chedo, chedoquat, den, nhietdo, nhietdoset, quat) {
    this.chedo = chedo;
    this.chedoquat = chedoquat;
    this.den = den;
    this.nhietdo = nhietdo;
    this.nhietdoset = nhietdoset;
    this.quat = quat;
}

function Home(cua, phongKhach, phongBep, phongNgu) {
    this.cua = cua;
    this.phongkhach = phongKhach;
    this.phongbep = phongBep;
    this.phongngu = phongNgu;
}
var phongBep = new Phong();
var phongKhach = new Phong();
var phongNgu = new Phong();
var datn;
var cua;
var checkRoom = "phongkhach";

function getStatusRoom(roomNameObject, room_name) {
    this.room = roomNameObject;
    this.room_name = room_name;
    $("#room_name").text(room_name);
    if (room.den == 1) {
        $("#imgLight").prop("src", "/assets/img/lighton.png");
        $(".statusLight").text(SystemParam.lightOn);
        $("#statusLight").prop("class", "fa fa-toggle-on");
    } else {
        $("#imgLight").prop("src", "/assets/img/lightoff.png");
        $(".statusLight").text(SystemParam.lightOff);
        $("#statusLight").prop("class", "fa fa-toggle-off");
    }
    if (room.quat == 1) {
        $("#imgFan").prop("src", "/assets/img/fop.png");
        $(".statusFan").text(SystemParam.fanOn);
        $("#statusFan").prop("class", "fa fa-toggle-on");
    } else {
        $("#imgFan").prop("src", "/assets/img/fo.png");
        $(".statusFan").text(SystemParam.fanOff);
        $("#statusFan").prop("class", "fa fa-toggle-off");
    }
    $("#temperator").text(room.nhietdo);
}

function getData() {
    database.ref().on("value", function(snap) {
        cua = 0;
        Object.assign(phongBep, snap.val().datn.phongbep);
        Object.assign(phongKhach, snap.val().datn.phongkhach);
        Object.assign(phongNgu, snap.val().datn.phongngu);
        datn = new Home(cua, phongKhach, phongBep, phongNgu);
        if (checkRoom == "phongkhach") {
            getStatusRoom(phongKhach, SystemParam.phongKhach);
        } else {
            if (checkRoom == "phongngu") {
                getStatusRoom(phongNgu, SystemParam.phongNgu);
            } else {
                if (checkRoom == "phongbep") {
                    getStatusRoom(phongBep, SystemParam.phongBep);
                }
            }
        }
    });
}

$(document).ready(function() {
    getData();
});

$(".phong-ngu").click(function() {
    $(".phong-khach").removeClass(SystemParam.navActive);
    $(".phong-ngu").addClass(SystemParam.navActive);
    $(".phong-bep").removeClass(SystemParam.navActive);
    checkRoom = "phongngu";
    getStatusRoom(phongNgu, SystemParam.phongNgu);
});
$(".phong-khach").click(function() {
    $(".phong-khach").addClass(SystemParam.navActive);
    $(".phong-ngu").removeClass(SystemParam.navActive);
    $(".phong-bep").removeClass(SystemParam.navActive);
    checkRoom = "phongkhach";
    getStatusRoom(phongKhach, SystemParam.phongKhach);
});
$(".phong-bep").click(function() {
    $(".phong-khach").removeClass(SystemParam.navActive);
    $(".phong-ngu").removeClass(SystemParam.navActive);
    $(".phong-bep").addClass(SystemParam.navActive);
    checkRoom = "phongbep";
    getStatusRoom(phongBep, SystemParam.phongBep);
});

function setClickFan(roomNameObject) {
    this.room = roomNameObject;
    if (room.quat == 0) {
        room.quat = 1;
        $("#imgFan").prop("src", "/assets/img/fop.png");
        $(".statusFan").text(SystemParam.fanOn);
        $("#statusFan").prop("class", "fa fa-toggle-on");
    } else {
        room.quat = 0;
        $("#imgFan").prop("src", "/assets/img/fo.png");
        $(".statusFan").text(SystemParam.fanOff);
        $("#statusFan").prop("class", "fa fa-toggle-off");
    }
}

function setClickLight(roomNameObject) {
    this.room = roomNameObject;
    if (room.den == 0) {
        room.den = 1;
        $("#imgLight").prop("src", "/assets/img/lighton.png");
        $(".statusLight").text(SystemParam.lightOn);
        $("#statusLight").prop("class", "fa fa-toggle-on");
    } else {
        room.den = 0;
        $("#imgLight").prop("src", "/assets/img/lightoff.png");
        $(".statusLight").text(SystemParam.lightOff);
        $("#statusLight").prop("class", "fa fa-toggle-off");
    }
}
$("#imgFan").click(function() {
    if (checkRoom == "phongkhach") {
        setClickFan(phongKhach);
        database.ref().set({ datn });
    }
    if (checkRoom == "phongngu") {
        setClickFan(phongNgu);
        database.ref().set({ datn });
    }
    if (checkRoom == "phongbep") {
        setClickFan(phongBep);
        database.ref().set({ datn });
    }

});
$('#imgLight').click(function() {
    if (checkRoom == "phongkhach") {
        setClickLight(phongKhach);
        database.ref().set({ datn });
    }
    if (checkRoom == "phongngu") {
        setClickLight(phongNgu);
        database.ref().set({ datn });
    }
    if (checkRoom == "phongbep") {
        setClickLight(phongBep);
        database.ref().set({ datn });
    }
});