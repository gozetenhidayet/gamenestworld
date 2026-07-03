# GameNest World — SEO & AdSense Reklam Yerleşimi Rehberi

## 1. Bu pakette ne var?

```
index.html                  → düzeltilmiş ana sayfa (achievements grid fix dahil)
about.html                  → Hakkımızda
contact.html                → İletişim
privacy-policy.html         → Gizlilik Politikası
terms.html                  → Kullanım Şartları
cookie-policy.html          → Çerez Politikası
faq.html                    → SSS (FAQPage schema ile)
sitemap.xml                 → 32 URL (7 statik sayfa + 24 blog yazısı + blog index)
robots.txt                  → Sitemap referanslı, tüm botlara açık
blog/index.html             → Blog ana sayfası (24 makale kart görünümü)
blog/*.html                 → 24 adet özgün makale (Article schema ile)
```

Tüm sayfalar mevcut sitenin koyu tema renk paletini (`#0f0c29`, `#6366f1`, `#818cf8`) ve
Plus Jakarta Sans / Inter fontlarını kullanır, böylece ana sayfayla görsel tutarlılık sağlanır.

## 2. Yayına alma adımları

1. Tüm dosyaları domain kökünüze yükleyin (`gamenestworld.com/`), `blog/` klasörü dahil.
2. `index.html` içindeki eski dosyanın yerine bu düzeltilmiş sürümü koyun.
3. Google Search Console'da `sitemap.xml`'i gönderin: Search Console → Sitemaps → `sitemap.xml`.
4. robots.txt'nin `https://gamenestworld.com/robots.txt` adresinden erişilebilir olduğunu doğrulayın.
5. AdSense hesabınız onaylandıktan sonra `data-ad-client` değeri zaten doğru (`ca-pub-3359266836868361`);
   sadece her `data-ad-slot` değerini AdSense panelinden aldığınız gerçek slot ID'leriyle değiştirin
   (şu an placeholder: `0000000001`, `0000000002`, `0000000003`).

## 3. Yapılan SEO İyileştirmeleri

- **Benzersiz title + meta description** her sayfada (blog dahil) — kopya içerik riski yok.
- **Canonical URL** her sayfada tanımlı.
- **Article schema (JSON-LD)** her blog yazısında — Google'da zengin sonuç (rich result) ihtimalini artırır.
- **FAQPage schema** hem ana sayfada hem `/faq.html`'de.
- **Dahili linkleme (internal linking):** her makale sonunda ilgili oyuna CTA linki, footer'da tüm önemli sayfalara link, blog index'te tüm makalelere link.
- **Breadcrumb metni** (Home / Blog / Makale) her makalede — kullanıcı deneyimi ve SEO için.
- **sitemap.xml + robots.txt** ile arama motorlarının tüm sayfaları keşfetmesi kolaylaştırıldı.
- **Semantik başlık hiyerarşisi** (H1 → H2 → H3) her sayfada tutarlı.
- **Mobile-first, responsive tasarım** — Core Web Vitals ve mobile-first indexing için önemli.

### Sonraki adımlar (önerilir, bu pakete dahil değil)
- Her makaleye 1 orijinal görsel/illüstrasyon eklemek (alt metinli) — görsel arama trafiği için.
- Google Search Console'da URL denetimi yaparak indexlenmeyi hızlandırmak.
- `hreflang` etiketlerini blog sayfalarına da uygulamak (şu an sadece ana sayfada var).
- Sayfa hızını PageSpeed Insights ile ölçüp büyük JS dosyasını (index.html içindeki oyun motoru) code-splitting ile bölmek.

## 4. AdSense Reklam Yerleşimleri (Policy-uyumlu)

Her blog makalesinde **3 reklam alanı** var:

| Konum | Amaç | AdSense uyumu |
|---|---|---|
| Giriş paragrafından hemen sonra | Erken görünürlük | ✅ İçerikten net şekilde ayrılmış (`ad-slot` kutusu) |
| Makale ortasında | Scroll derinliği yakalama | ✅ İki içerik bloğu arasında, yanıltıcı değil |
| Makale sonunda | Çıkış öncesi son gösterim | ✅ CTA'dan önce, kullanıcıyı yanıltmıyor |

Blog index sayfasında da üstte ve altta 1'er reklam alanı bırakıldı.

**AdSense politikasına uyum için dikkat edilenler:**
- Reklamlar **her zaman gerçek içerikten görsel olarak ayrı** (kesikli çerçeveli kutu).
- Sayfa başına **aşırı reklam yoğunluğu yok** (makale başına sadece 3 slot).
- Hiçbir reklam **tıklamayı teşvik eden metin** içermiyor ("buraya tıkla" gibi ifadeler yok).
- Reklamlar **navigasyon veya oyun arayüzüyle karışmıyor** — sadece blog/statik sayfalarda.
- `ins.adsbygoogle` etiketleri doğru `data-ad-client` ile önceden hazır; onay sonrası sadece slot ID'lerini girmeniz yeterli.

### Ana sayfa (index.html) için öneri
Ana sayfada oyun ızgarasının (`game-grid`) hemen altına ve leaderboard bölümünün altına
birer `ad-slot` eklemek, oyuncu deneyimini bozmadan gelir fırsatı yaratır. Bu pakette
ana sayfaya reklam eklenmedi çünkü oyun motoru ile mizanpajı bozmamak için önce sizin
onayınızı almak istedik — isterseniz aynı `ad-slot` bileşenini oraya da uygulayabiliriz.

## 5. İçerik Takvimi Önerisi (24 makale sonrası)

Ayda 4 yeni makale (haftada 1) eklemeye devam etmek, "taze içerik" sinyali için idealdir.
Öneri konu havuzu: her yeni oyun eklendiğinde bir "nasıl oynanır" rehberi, mevsimsel
temalar (yaz tatili, okul dönüşü), oyuncu başarı hikayeleri, oyun güncellemesi duyuruları.
