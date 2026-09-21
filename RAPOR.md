# GameNestWorld.com — Round 22 Raporu

Tarih: 2026-09-21

Bu round'da 4 ayrı konu bildirdiniz. İkisini tamamen düzelttim, biri zaten bir önceki pakette (v21) düzeltilmişti (yeniden doğruladım), ikisi için ise sizden bilgi/karar gerekiyor — aşağıda net şekilde ayrılmış durumda.

---

## 1) Oyun sayısı tutarsızlığı — DÜZELTİLDİ ✅

Haklıydınız — dosyayı satır satır taradım ve gerçekten **aynı sayfada 5 farklı sayı** kullanılıyordu:

| Yer | Eskiden | 
|---|---|
| `<title>`, meta açıklaması, Open Graph/Twitter etiketleri, "Tüm Oyunlar" JSON-LD listesi | 62 |
| H1 başlığı ve sayfadaki tanıtım paragrafı | 60 |
| WebSite JSON-LD şeması açıklaması | 60 |
| Footer'daki etiket yazısı | 60 (İngilizce) |
| "Tips & Guides" bölümündeki okul/paylaşımlı bilgisayar paragrafı | 58 |
| Görünür SSS + SSS'nin arka plandaki JSON-LD şeması | 59 |
| **24 dilin tamamındaki** footer yazısı ve tanıtım paragrafı (Türkçe, İspanyolca, Fransızca, Almanca, Rusça, Arapça, Çince, Japonca, Korece, Felemenkçe, Lehçe, Farsça ve diğerleri) | çoğu 58 (Farsça'da bir yerde Doğu Arap rakamlarıyla "۵۸" yazılmış) |

Gerçek oyun sayısı **62** (Round 20'de eklenen Ahşap IQ Bulmacası ve Renkli Blok Kulesi ile). Bu sayıyı **sitedeki her yerde** 62 olacak şekilde düzelttim — toplamda İngilizce dahil tüm konumlar ve 24 dilin her biri (48 ayrı metin alanı) güncellendi. Ayrıca kodun içinde geliştirici notu olarak geçen, kullanıcıya görünmeyen bir yorumda da "59 oyun" yazıyordu, onu da düzelttim.

Google ve kullanıcılar artık sitenin her köşesinde aynı, tutarlı "62" rakamını görecek.

Kategori rozetlerindeki sayılar (Classic, Quiz vb.) zaten koddan otomatik hesaplanıyor, elle yazılmış değil — bu yüzden onlarda böyle bir tutarsızlık riski yok.

## 2) Reklam karşılığı ödül sistemi — ZATEN DÜZELTİLMİŞTİ (bir önceki paket) ✅

Bu, bir önceki mesajınızda bildirdiğiniz sorundu ve **bir önceki paket (v21)** ile zaten tamamen düzeltilmişti: "Can Kalmadı!" ekranındaki sahte 5 saniyelik geri sayım sistemi tamamen kaldırıldı, artık sitede ödül veren tek yol Google'ın gerçek Rewarded Ads (Ad Placement API) akışı. Bu round'da bunu tekrar gerçek tarayıcı testleriyle doğruladım — hâlâ sorunsuz çalışıyor, herhangi bir gerileme yok.

## 3) Oyun bazlı SEO sayfaları (Snake, Tetris vb.) — SİZDEN DOSYA GEREKİYOR ⚠️

Bahsettiğiniz "Snake/Tetris gibi ayrı SEO sayfaları" ve "if this game has levels..." gibi şablon cümleler içeren sayfalar, elimdeki dosyada **yok**. Üzerinde çalıştığım tek dosya `index.html` — sitenin tamamı (62 oyun, tüm metinler, SSS, ipuçları bölümü) bu tek dosyanın içinde. Ayrı `/snake.html`, `/tetris.html` gibi bağımsız SEO sayfaları bana hiç verilmedi ve elimde yok.

Bu sayfalar muhtemelen canlı sitede (gamenestworld.com) başka bir yöntemle (belki farklı bir araç, eklenti veya elle) oluşturulmuş olmalı. Onları göremediğim için içeriklerini 2048 sayfasının seviyesine getiremem — hiç görmediğim bir sayfayı tahminle yeniden yazmak riskli olur, gerçek yapıyı bozabilir.

**Bu işe başlayabilmem için:** o sayfaların HTML dosyalarını (Snake, Tetris ve diğerlerini) bana yükleyebilir misiniz? Onları inceleyip 2048 sayfasıyla aynı özgünlük/derinlik seviyesine getirebilirim.

## 4) "Kids and classrooms" / çocuklara yönelik reklam sınıflandırması — SİZİN KARARINIZ GEREKİYOR ⚠️

Sitede geçen ifadeyi buldum — SSS bölümünde şu soru var: *"Are the games appropriate for kids and classrooms?"* Cevap ise şöyle: *"...general-audience content... We'd still recommend teachers and parents review the site themselves..."* — yani site **kendini çocuklara özel olarak yönelik (child-directed) olarak tanıtmıyor**, tam tersine "genel kitleye yönelik içerik, yine de öğretmen/veliler kontrol etsin" diyerek bilinçli şekilde temkinli bir dil kullanıyor. Bu aslında **doğru ve güvenli** bir çerçeveleme, çünkü sitenin özellikle 13 yaş altını hedeflediğini iddia etmiyor.

Ancak asıl mesele şu: **"child-directed treatment" bir kod ayarı değil, Google AdSense/Ad Manager hesabınızda yapmanız gereken bir öz-beyan (self-certification)**. Ben kodda bunu sizin adınıza karar veremem, çünkü:

- Eğer siteyi (veya belirli bölümlerini) gerçekten 13 yaş altını hedefleyen bir ürün olarak görüyorsanız, bunu AdSense hesabınızda **"Tagged for child-directed treatment"** olarak işaretlemeniz ve reklamları **non-personalized (ilgi alanına dayalı olmayan)** moda geçirmeniz gerekir — bu genellikle reklam gelirini düşürür ama COPPA/Google politikası gereği zorunludur.
- Eğer site **genel/karma kitleye** yönelikse (ki mevcut SSS metni tam olarak bunu söylüyor), o zaman özel bir işlem gerekmeyebilir — mevcut metniniz zaten bunu doğru şekilde ifade ediyor.

**Sizden karar:** Site (ya da bir bölümü — örneğin quiz/matematik oyunları) gerçekten 13 yaş altı çocukları özel olarak hedefliyor mu, yoksa genel kitleye mi yönelik (çocuklar da dahil olmak üzere herkes kullanabilir ama özel olarak onlara pazarlanmıyor)? Eğer "evet, child-directed olarak işaretlemek istiyorum" derseniz, kodda reklamları non-personalized moda geçirecek teknik değişikliği (Google'ın `requestNonPersonalizedAds` bayrağı) hemen ekleyebilirim — ama asıl beyanı AdSense hesap panelinizden yapmanız gerekecek, bunu ben yapamam.

---

## Test yöntemi

- Tüm inline JavaScript ve JSON-LD blokları söz dizimi/geçerlilik açısından yeniden doğrulandı — 0 hata.
- **62 oyunun tamamı** üzerinde agresif otomatik oynanış taraması yeniden çalıştırıldı — 0 hata.
- Mobil (iPhone 13) simülasyonu yeniden çalıştırıldı — 0 taşma, 0 hata.
- Round 21'in reklam ödül düzeltmesi (gerçek Rewarded Ads akışı, "No Lives Left" ekranı) özel test paketiyle yeniden doğrulandı — 0 hata, tüm senaryolar (ödül verildi / erken kapatıldı / reklam yoktu) doğru çalışıyor.
- Oyun sayısı için: dosyanın tamamında "57-61" arası her sayı tek tek tarandı, oyun sayısıyla ilgili olmayanlar (örn. "60 saniye" süre sınırları, CSS renkleri, JSON-LD liste pozisyonları) elenip yalnızca gerçek oyun-sayısı referansları düzeltildi — böylece "60 saniyelik Yazma Hızı" gibi doğru olan ifadeler yanlışlıkla değiştirilmedi.

## Hatırlatma

- `google-site-verification` yer tutucusu hâlâ doldurulması gerekiyor.
- SEO sayfaları (madde 3) için dosyaları bekliyorum.
- Çocuklara yönelik reklam sınıflandırması (madde 4) için kararınızı bekliyorum.
- Bu round'un paketi `index.html` + bu rapor dosyasını içeriyor; diğer her şey (sitemap, robots.txt, oyun içerikleri, Round 21'in reklam düzeltmesi) aynen korundu.
