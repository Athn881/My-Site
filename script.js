// Firebase konfigürasyonu
const firebaseConfig = {
    apiKey: "AIzaSyDbiUlXbXyOBjVeB-Kk22u4LSDcqhpyh0M",
    authDomain: "memnuniyet-anketi-c5482.firebaseapp.com",
    databaseURL: "https://memnuniyet-anketi-c5482-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "memnuniyet-anketi-c5482",
    storageBucket: "memnuniyet-anketi-c5482.appspot.com",
    messagingSenderId: "857603186862",
    appId: "1:857603186862:web:a2c65b1a0592f42e164d3f",
    measurementId: "G-GSZTS3PENP"
};

// Firebase'i başlat
const app = firebase.initializeApp(firebaseConfig);
const analytics = app.analytics();
const auth = app.auth();

var secilenIl, secilenIlce;

$(document).ready(function () {
    // İllerin bulunduğu JSON dosyasını yükle
    $.getJSON("sehirler.json", function (data) {
        // İllerin listesini al
        var iller = Object.keys(data.iller);

        // İllerin dropdown listesini doldur
        for (var i = 0; i < iller.length; i++) {
            $("#iller").append("<option value='" + iller[i] + "'>" + iller[i] + "</option>");
        }

        // İl seçildiğinde
        $("#iller").change(function () {
            // Seçilen ilin değerini al
            secilenIl = $(this).val();

            // İlçe listesini güncelle
            updateIlceListesi(secilenIl, data);

            // İlçe listesini göster ve animasyonlu geçiş yap
            $(".ilce-listesi").slideDown("slow");
            $(".ilerle-buton").hide(); // İlerle butonunu gizle
        });
    });
});

// Il ve ilçe seçildiğinde çağrılacak fonksiyon
function updateSorular() {
    // Il seçildiğinde, seçilen il adını güncelle
    var selectedIl = secilenIl ? secilenIl : "selectedIlAdiSpan";
    $("#selectedIlAdiSpan").text(selectedIl);

    // Ilçe adını güncelle (eğer secilenIlce tanımlıysa)
    var selectedIlce = secilenIlce ? secilenIlce : "selectedIlAdiIlceAdiSpan";
    $("#selectedIlAdiIlceAdiSpan").text(selectedIl);
    $("#selectedIlceAdiSpan").text(selectedIlce);
}

// Il ve ilçe seçildiğinde güncellemeleri yap
updateSorular();

function updateIlceListesi(il, data) {
    // İlçe listesini temizle
    $("#ilceler").empty();

    // Seçilen ile göre ilçeleri ekle
    var ilceler = data.iller[il];

    // İlçelerin boş olup olmadığını kontrol et
    if (ilceler && ilceler.length > 0) {
        for (var i = 0; i < ilceler.length; i++) {
            $("#ilceler").append("<option value='" + ilceler[i] + "'>" + ilceler[i] + "</option>");
        }
    } else {
        // İlçe bulunamadıysa bir mesaj ekleyebilirsiniz
        $("#ilceler").append("<option disabled selected>Seçiniz</option>");
    }
}

// Dil değiştirme fonksiyonu
function changeLanguage() {
    var selectedLanguage = $("#dilSecenekleri").val();
    // Dil çevirisini yapmak için gerekli kodları ekleyebilirsiniz
    // Burada sadece örnek bir alert mesajı gösteriyorum
    alert("Dil değiştirildi: " + selectedLanguage);
}

// İlerle butonu fonksiyonu
function ilerle() {
    var secilenIlce = $("#ilceler").val();
    var eksikAlanMesajiIlce = $("#eksikAlanMesajiIlce");

    if (!secilenIlce) {
        eksikAlanMesajiIlce.text("Lütfen ilçe seçimi yapınız.");
        $(".ilerle-buton button").css("background-color", "#c0392b"); // İlerle buton rengini kırmızı yap
        $(".ilerle-buton").show(); // İlerle butonunu göster
    } else {
        eksikAlanMesajiIlce.text("");

        // Diğer işlemleri burada gerçekleştirin
        // Soruları göster animasyonlu bir şekilde
        $(".soru-cevap-kutusu").slideDown("slow", function () {
            sorulariDoldur();

            // Cevapları Gönder butonunu göster
            $(".cevap-gonder").slideDown("slow", function () {
                // İlerle butonunu göster
                $(".ilerle-buton button").css("background-color", "#c0392b"); // İlerle buton rengini kırmızı yap
                $(".ilerle-buton").show();
            });
        });

        // Ilce adını güncelle
        $("#selectedIlceAdi").text(secilenIlce);
    }
}

// Soruları dolduran fonksiyon
function sorulariDoldur() {
    // Bu kısma soruları dolduracak kodları ekleyebilirsiniz.
    // Örneğin:
    $("#selectedIlAdiIlceAdi").html(`<span id="selectedIlAdi">${secilenIl}</span>'nin <span id="selectedIlceAdi">${secilenIlce}'si</span>`);
}

// Cevapları gönder butonu fonksiyonu
function cevaplariGonder() {
    // Cevapları kontrol et
    var soru1Cevap = $("input[name='soru1']:checked").val();
    var soru2Cevap = $("input[name='soru2']:checked").val();

    // Cevapların boş olup olmadığını kontrol et
    if (!soru1Cevap || !soru2Cevap) {
        alert("Lütfen tüm sorulara cevap veriniz.");
    } else {
        // Cevapları Firebase'e gönder
        // Bu kısmı Firebase'e cevapları göndermek için kullanmanız gerekiyor
        // Örneğin:
        // firebase.firestore().collection('cevaplar').add({
        //     il: secilenIl,
        //     ilce: secilenIlce,
        //     soru1: soru1Cevap,
        //     soru2: soru2Cevap
        // });

        // Cevapların başarıyla gönderildiği mesajını göster
        $(".soru-cevap-kutusu, .cevap-gonder").hide(); // Soruları ve Cevap Gönder butonunu gizle
        $(".basari-mesaji").slideDown("slow"); // Başarı mesajını göster
    }
}

// Giriş yap butonu fonksiyonu
function girisYap() {
    var email = $("#email").val();
    var sifre = $("#sifre").val();

    // Email ve şifre kontrolü
    if (!email || !sifre) {
        alert("Lütfen email ve şifre alanlarını doldurun.");
    } else {
        // Firebase ile giriş yap
        auth.signInWithEmailAndPassword(email, sifre)
            .then((userCredential) => {
                // Başarıyla giriş yapıldığında anket sayfasına yönlendir
                window.location.href = "il-ilce.html";
            })
            .catch((error) => {
                // Giriş yaparken bir hata oluştuğunda yapılacak işlemler
                alert("Giriş yaparken bir hata oluştu: " + error.message);
            });
    }
}

// Hesap oluştur butonu fonksiyonu
function hesapOlustur() {
    var email = $("#email").val();
    var sifre = $("#sifre").val();

    // Email ve şifre kontrolü
    if (!email || !sifre) {
        alert("Lütfen email ve şifre alanlarını doldurun.");
    } else {
        // Firebase ile hesap oluştur
        auth.createUserWithEmailAndPassword(email, sifre)
            .then((userCredential) => {
                // Başarıyla hesap oluşturulduğunda giriş yapma sayfasına yönlendir
                window.location.href = "giris.html";
            })
            .catch((error) => {
                // Hesap oluştururken bir hata oluştuğunda yapılacak işlemler
                alert("Hesap oluştururken bir hata oluştu: " + error.message);
            });
    }
}
