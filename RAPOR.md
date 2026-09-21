# GameNestWorld.com — Round 23 Raporu

Tarih: 2026-09-21

Gönderdiğiniz gerçek Search Console ekran görüntüleri çok değerliydi — kod okuyarak asla bulamayacağım, canlı sitede gerçekten olan bir hatayı ortaya çıkardı. Aşağıda tek tek.

---

## 1) "Page with redirect" (17 oyun URL'si) — GERÇEK HATA BULUNDU VE DÜZELTİLDİ ✅

Ekran görüntülerinizde `?play=snake`, `?play=tetris`, `?play=g2048` gibi 17 oyun URL'sinin **"Page with redirect"** olarak işaretlendiğini gördüm. Kodu bu sinyalle birlikte yeniden inceleyince kök nedeni buldum:

Sayfanın en altında, birisi `/?play=snake` gibi bir bağlantıyla siteye geldiğinde ilgili oyunu otomatik açan bir script var. Bu script oyunu açtıktan **hemen sonra** tarayıcının adres çubuğundaki `?play=snake` kısmını sessizce silip `/`'e geri döndürüyordu (`history.replaceState` ile). Bir insan için bu görünürde sorun yaratmıyor — oyun zaten açık. Ama Google'ın sayfayı JavaScript ile render eden tarayıcısı için bu tam olarak "bu URL aslında başka bir URL'e yönleniyor" (redirect) anlamına geliyor. Sonuç: sitenizin kendi yapısal verisinde (JSON-LD) söz verdiği 62 ayrı oyun URL'sinin **hiçbiri kendi başına indekslenemiyordu** — hepsi görünüşte ana sayfaya "yönleniyor" gibi algılanıyordu.

**Düzeltme:** O adres çubuğu temizleme satırını kaldırdım. Artık `?play=snake` ile gelen bir ziyaretçi (insan ya da Google) oyunu açtığında adres çubuğunda **aynı URL kalıyor** — paylaşılabilir, yer imine eklenebilir, ve Google artık her oyunu kendi URL'si üzerinden gerçekten indeksleyebilir. 8 farklı oyunla (snake, tetris, 2048, sudoku, satranç, hafıza, bulmaca, kelime avı) gerçek tarayıcı testiyle doğruladım: URL korunuyor, oyun açılıyor, kapatma da sorunsuz çalışıyor — hiçbir gerileme yok.

Bu, önceki round'larda kod okuyarak fark edemediğim, sadece gerçek Search Console verisiyle ortaya çıkan **gerçek ve önemli** bir SEO hatasıydı — paylaştığınız için teşekkürler.

## 2) "Not found (404)" ve "Crawled – currently not indexed" (44 sayfa) — BOZUK SITEMAP TESPİT EDİLDİ, DÜZELTİLMİŞ VERSİYON EKTE ✅

Ekran görüntülerinizdeki 404 listesine baktım: `/tr/about.html`, `/fa/about.html`, `/es/about.html`... (24 dilin hepsi için ayrı "about" sayfaları) ve `/games/science-quiz/`, `/ar/games/chess/`, `/de/games/chess/` gibi klasör-tarzı oyun sayfaları. Sitenin gerçek yapısını kontrol ettim: **bu sayfalar hiç var olmadı ve hiç var olmayacak** — site tek bir `index.html` dosyası, diller `?lang=xx` parametresiyle, oyunlar `?play=oyunadi` parametresiyle aynı sayfada açılıyor. Gerçek, var olan ek sayfalar sadece şunlar: `/about.html`, `/privacy.html`, `/terms.html`, `/contact.html` (dil eki yok, tek İngilizce versiyon).

Bu, sitenizdeki **sitemap.xml dosyasının** (muhtemelen bir şablon veya eski bir plana göre) hiç var olmayan, "her dil için ayrı about sayfası" ve "her oyun için ayrı klasör sayfası" varsayarak yazıldığını gösteriyor. Google bu sitemap'i okuyup listelenen 44+ URL'yi ziyaret ediyor, hepsi 404 veya boş dönüyor — bu hem Google'ın gözünde siteyi daha az güvenilir gösteriyor hem de asıl önemli sayfalarınıza ayrılması gereken "crawl budget"ı (Google'ın sitenizi tarama sıklığı/kapasitesi) boşa harcıyor.

**Yaptığım:** Sitenin gerçek yapısına birebir uyan, sıfırdan doğru bir **`sitemap.xml`** oluşturdum — bu pakete ekledim. İçinde sadece gerçekten var olan/çalışan 90 URL var: ana sayfa, 4 statik sayfa (about/privacy/terms/contact), 23 dil varyantı (`?lang=xx`, İngilizce zaten ana sayfa olduğu için ayrı satır yok), ve 62 oyunun tamamı (`?play=xxx`, artık madde 1'deki düzeltme sayesinde bunlar gerçekten kendi URL'leri olarak çalışıyor).

**Sizden gereken:** Bu `sitemap.xml` dosyasını sitenizin kök dizinine (mevcut `sitemap.xml`'in üzerine) yükleyin, sonra Search Console'da **Sitemaps** bölümünden yeniden gönderin ("Resubmit"). Ayrıca elinizdeki mevcut **`robots.txt`** dosyasını bana gönderebilirseniz sevinirim — içinde başka disallow kuralları veya farklı bir sitemap adresi olup olmadığını görüp doğru şekilde işaret ettiğinden emin olmak istiyorum; körü körüne üzerine yazmak yerine gerçek içeriğini görüp kontrol etmek istiyorum.

## 3) Oyun sayısı tutarsızlığı — bir önceki paketle düzeltilmişti ✅

Değişiklik yok, hâlâ geçerli: title/meta/OG/JSON-LD/H1/footer/SSS/ipuçları bölümü ve 24 dilin tamamında tek sayı — 62.

## 4) Reklam ödül sistemi — bir önceki paketle düzeltilmişti ✅

Değişiklik yok, hâlâ geçerli: gerçek Google Rewarded Ads (Ad Placement API) akışı, ödül yalnızca gerçek izlenme onayından sonra veriliyor.

## 5) Search Console doğrulama kodu — site zaten doğrulanmış, acil değil

Ekran görüntülerinizden gamenestworld.com'un Search Console'da **zaten doğrulanmış bir mülk** olduğunu gördüm (aksi halde bu raporları göremezdiniz). Yani dosyadaki yer tutucu (`REPLACE_WITH_YOUR_SEARCH_CONSOLE_CODE`) şu an için doğrulamayı bozmuyor — muhtemelen doğrulama başka bir yöntemle (ör. zaten kurulu olan Google Analytics bağlantısı üzerinden) yapılmış. Yine de en sağlıklısı gerçek kodu dosyaya koymak (Google bazen doğrulamayı yeniden kontrol edebilir) — isterseniz Settings → Ownership verification → HTML tag sekmesinden kodu alıp bana iletin, ekleyeyim; acil değil.

## 6) Oyun bazlı SEO sayfaları (Snake/Tetris vb.) — hâlâ dosya bekliyorum

Madde 2'deki 404 analizi aslında bunu da açıklığa kavuşturuyor olabilir: eğer bahsettiğiniz "ayrı SEO sayfaları" `/games/snake/` gibi bir yapıdaysa, bunlar **hiç var olmuyor** (404 listesinde tam olarak bu desen var). Eğer öyleyse, bu maddenin cevabı "önce o sayfaları gerçekten oluşturmak" olabilir — şablon içerik yerine 2048 sayfası kalitesinde, gerçek sayfalar. Ama emin olmak için: bu sayfaları tarayıcınızda gerçekten görebiliyor musunuz (canlı sitede)? Görüyorsanız HTML dosyalarını yükleyin, görmüyorsanız (404 alıyorsanız) bu zaten madde 2 ile aynı kök soruna işaret ediyor ve onları sıfırdan inşa etmemiz gerekiyor — bu durumda hangi oyunlar için öncelik istediğinizi söylerseniz başlarım.

---

## Test yöntemi

- Tüm inline JavaScript ve JSON-LD blokları söz dizimi/geçerlilik açısından doğrulandı — 0 hata.
- Yeni `?play=` URL düzeltmesi için özel bir test yazıldı: 8 farklı oyun için `/?play=X` ile doğrudan sayfa açılışı simüle edildi — her birinde URL'nin adres çubuğunda kaldığı, oyunun gerçekten açıldığı ve kapatmanın hatasız çalıştığı doğrulandı (16/16 kontrol geçti).
- **62 oyunun tamamı** üzerinde agresif otomatik oynanış taraması yeniden çalıştırıldı — 0 hata (bu değişiklik hiçbir oyunu bozmadı).
- Mobil (iPhone 13) simülasyonu yeniden çalıştırıldı — 0 taşma, 0 hata.
- Reklam ödül sistemi testi yeniden çalıştırıldı — 0 hata, gerileme yok.
- Yeni `sitemap.xml` geçerli XML olarak doğrulandı, içindeki her URL sitenin gerçek, çalışan yapısıyla (gerçek oyun anahtarları, gerçek dil kodları, gerçek statik sayfalar) birebir eşleştirildi.

## Hatırlatma

- `robots.txt` dosyanızı paylaşırsanız kontrol edip gerekirse düzeltirim.
- Search Console kodu (madde 5) acil değil ama isterseniz gönderin, ekleyeyim.
- Oyun bazlı SEO sayfaları (madde 6) için netlik/dosya bekliyorum.
- Bu paket `index.html` + `sitemap.xml` (yeni) + bu rapor dosyasını içeriyor.
