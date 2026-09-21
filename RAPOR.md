# GameNestWorld.com — Round 21 Raporu

Tarih: 2026-09-21

## Bu turun konusu: Reklam karşılığı ödül sistemi (en yüksek öncelik)

Bildirdiğiniz sorun aynen şuydu: Sitede "📺 Watch Ad → +30 XP & +3 lives!" yazan bir düğme görüyorsunuz ve bunun standart bir AdSense birimiyle gösterildiyse ciddi bir politika ihlali riski olduğunu belirttiniz — Google, ödülün ancak gerçek **Rewarded Ads** envanteri üzerinden verilmesine izin veriyor. "Bu mekanizmayı ya kaldırın ya da gerçekten Rewarded Ads formatına taşıyın" dediniz.

Kodun tamamı satır satır incelendi ve **iki ayrı şey** bulundu:

### 1) Üstteki "Watch Ad" düğmesi — zaten doğru kurulmuştu

Sayfanın üst kısmındaki `📺 Watch Ad → +30 XP & +3 lives!` düğmesi, incelemede, Google'ın gerçek **H5 Games Ad Placement API**'sini (`adBreak(type:'reward', ...)`) kullanacak şekilde kurulu bulundu — yani ödül yalnızca `adViewed` geri çağrısı (Google'ın reklamın gerçekten sonuna kadar izlendiğini onayladığı an) tetiklendiğinde veriliyordu. Bu düğme için ekstra bir düzeltme gerekmedi, sadece kodun geri kalanının da aynı yolu kullanmasını sağlayacak ortak bir yardımcı fonksiyon haline getirildi (`gnwWatchRewardedAd`), aşağıdaki 2. maddede anlatılan sorunun aynısına düşmemesi için.

### 2) "Can Kalmadı!" ekranındaki asıl düğme — GERÇEK ve CİDDİ bir sorun bulundu ve düzeltildi

Bir oyunda canlarınız bittiğinde çıkan **"No Lives Left!"** ekranındaki `📺 Watch Ad → +3 Lives` düğmesi, incelemede, **hiçbir gerçek reklam sistemine hiç bağlanmayan, tamamen sahte bir mekanizmaya** gittiği görüldü:

- Düğmeye basınca gerçek bir reklam açılmıyordu; ekranda 5 saniyelik bir geri sayım ve **"📺 Advertisement (AdSense Video Ad)"** yazan sabit, sahte bir görsel kutu beliriyordu.
- 5 saniye sonunda "Claim" düğmesi aktif oluyor ve tıklanınca **koşulsuz olarak** ödül (can/XP) veriliyordu — Google'a hiçbir istek gitmeden.
- Bu, raporunuzda belirttiğiniz "yanlış reklam birimi kullanmak"tan daha ciddi bir durum: burada **gerçekte hiç sunulmamış bir reklam izlenmesi simüle ediliyor** ve kullanıcıya "bu AdSense reklamıdır" izlenimi veren metin gösteriliyordu. Bu, sitenin en sık kullanılan para kazanma anında (can bitince) canlı ve erişilebilir durumdaydı.

**Yapılan düzeltme:** Bu sahte sistem tamamen kaldırıldı. "No Lives Left!" ekranındaki düğme artık üstteki düğmeyle **birebir aynı gerçek Rewarded Ads akışını** kullanıyor:

- Düğmeye ilk basışta Google'a gerçek bir reklam isteği gönderiliyor (`adBreak`) ve ekranda "Reklam hazırlanıyor…" durumu gösteriliyor.
- Tarayıcı güvenlik kuralları gereği, bir reklamı gerçekten göstermek için kullanıcının **doğrudan, taze bir tıklaması** gerekiyor — bu yüzden reklam hazır olduğunda "Ad ready — tap Watch again to view it" mesajı çıkıyor ve kullanıcı düğmeye **ikinci kez** basınca reklam gerçekten gösteriliyor. (Bu, Google'ın kendi belgelediği standart akış; sahte sistemde bu adım hiç yoktu çünkü ortada gerçek bir reklam yoktu.)
- Ödül (can), **sadece ve sadece** Google'ın reklamın gerçekten sonuna kadar izlendiğini bildirdiği `adViewed` anında veriliyor. Kullanıcı reklamı erken kapatırsa (`adDismissed`) veya reklam o an mevcut değilse, ekranda dürüst bir durum mesajı gösteriliyor ve **hiçbir ödül verilmiyor** — eskiden olduğu gibi koşulsuz ödül yok.
- "Can Kalmadı!" ekranı artık düğmeye ilk basışta hemen kapanmıyor; gerçek ödül verilene kadar açık kalıyor, böylece hiçbir aşamada "ödül verildi" izlenimi erken oluşmuyor.
- Sitenin başka hiçbir yerinde (ipucu/cevap gösterme gibi, şu an kullanılmayan ama koda gömülü kod yolları dahil) artık sahte reklam sistemine giden hiçbir bağlantı kalmadı — hepsi aynı tek gerçek yola yönlendirildi. Eski sahte fonksiyon (`showRewardedAd`), ileride biri yanlışlıkla ona bir düğme bağlarsa bile artık otomatik olarak gerçek sisteme yönlenen güvenli bir yönlendirmeye dönüştürüldü; sahte "📺 (AdSense Video Ad)" görselini üreten kod tamamen silindi.

**Özetle:** Artık sitede ödül veren **tek bir** reklam yolu var, o da gerçek Google Rewarded Ads (Ad Placement API) — ve ödül, Google'ın reklamın gerçekten izlendiğini onayladığı an dışında hiçbir zaman verilmiyor.

**Önemli not:** Bu düzeltme kodun *doğru* çalışmasını garanti eder — yani artık koşulsuz/sahte ödül verilmiyor ve gerçek Google API'si çağrılıyor. Ancak reklamların gerçekten dolup dolmayacağı (yani kullanıcıya gerçek bir video reklamın gösterilip gösterilmeyeceği) AdSense hesabınızın bu envanter için onaylı/uygun olup olmamasına bağlı; bunu AdSense panelinizde **Ads > By ad unit** bölümünden kontrol etmenizi öneririm.

---

## Test yöntemi

Sadece kod okuyarak değil, gerçek bir tarayıcı motoruyla (Playwright/Chromium) uçtan uca test edildi:

- Google'ın reklam API'sini taklit eden bir sahte `adBreak` kuruldu ve üç senaryo test edildi: (1) reklam tamamlanıp izlendi → ödül verildi, (2) reklam erken kapatıldı → ödül **verilmedi**, ekran açık kaldı, (3) reklam o an mevcut değil → ödül **verilmedi**, dürüst bir mesaj gösterildi.
- Üstteki "Watch Ad" düğmesinde: ilk tıklamada ödül verilmediği, ikinci (onaylayıcı) tıklamadan sonra ödülün verildiği doğrulandı.
- "No Lives Left!" ekranında: ekranın ilk tıklamada kapanmadığı, ödülün yalnızca gerçek izlenme onayından sonra verildiği, ekranın da ancak o zaman kapandığı doğrulandı.
- Sahte reklam sisteminin kod tabanından tamamen temizlendiği (eski `rewardedModalHTML` fonksiyonunun artık var olmadığı) doğrulandı.
- Tüm inline JavaScript blokları söz dizimi hatası için yeniden doğrulandı — 0 hata.
- **62 oyunun tamamı** üzerinde agresif otomatik oynanış taraması yeniden çalıştırıldı — 0 hata (bu değişiklik hiçbir oyunu etkilemedi).
- Mobil (iPhone 13) simülasyonu yeniden çalıştırıldı — 0 taşma, 0 hata.
- Round 19 ve Round 20'de düzeltilen tüm hatalar yeniden test edildi — hepsi hâlâ düzgün çalışıyor, bu round'un değişikliği hiçbir şeyi bozmadı.
- Global fonksiyon isim çakışması taraması yeniden çalıştırıldı — bu round'da eklenen kodda yeni bir çakışma yok.

## Hatırlatma

- `google-site-verification` yer tutucusu hâlâ doldurulması gerekiyor (Round 19'dan beri değişmedi).
- Reklamların gerçekten AdSense hesabınızda dolup dolmadığını (rewarded ad inventory eligibility) kontrol etmenizi öneririm — kod artık kesinlikle doğru API'yi doğru şekilde çağırıyor, ama bunun gerçek reklam göstermesi Google tarafındaki hesap onayınıza bağlı.
- Bu round'un paketi yine `index.html` + bu rapor dosyasını içeriyor; Round 18'in sitemap/robots.txt/SEO sayfaları/game-images klasörü ve Round 20'nin oyun içerikleri değişmedi.
