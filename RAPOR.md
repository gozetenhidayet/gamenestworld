# GameNestWorld — Round 25 Raporu (GitHub repo üzerinden doğrudan inceleme)

## Bu pakette ne var

13 düzeltilmiş oyun dosyası + mevcut sitemap.xml (değişmedi, kontrol edildi, sorunsuz).

Düzeltilen dosyalar: `anagram.html`, `breakout.html`, `c4.html`, `chess.html`, `cipher.html`,
`coin.html`, `colormatch.html`, `colorquiz.html`, `crossword.html`, `dice.html`,
`emojiquiz.html`, `expertquiz.html`, `rps.html`

## Yüklerken ne yapmalısınız

GitHub reponuzda bu 13 dosya **zaten aynı isimlerle kök dizinde** mevcut. Bu pakettekiler
onların yerine geçecek — yani bu 13 dosyayı reponuzda aynı isimle, aynı konuma (kök dizin,
`/` altına) yükleyip üzerine yazmanız yeterli. `sitemap.xml` de kök dizinde zaten var;
bu pakettekiyle aynı, değişiklik yok, sadece referans olarak ekledim.

## 1) Düzeltilen asıl sorun: sahte ödüllü reklam (AdSense politika ihlali)

Bu 13 dosyanın hepsinde aynı `watchAd()` fonksiyonu vardı: ekranda "Ad plays here" yazan boş
bir kutu, 5 saniyelik sahte bir geri sayım, sayaç bitince **hiçbir gerçek reklam API'si
çağrılmadan** direkt +30 XP veriliyordu. Bu, en başta bana bildirdiğiniz "Watch Ad → +30 XP"
sorununun ta kendisiydi — ben 21. turda kendi dosyamda düzeltmiştim ama bu 13 dosya ayrı bir
kod tabanında olduğu için o fix buralara hiç ulaşmamış.

Yaptığım düzeltme: sahte sayaç tamamen kaldırıldı, yerine Google'ın gerçek **H5 Games Ad
Placement API**'si (`window.adBreak`) konuldu. Artık XP/can ödülü **sadece** Google'ın
`adViewed` olayı gerçekten tetiklendiğinde veriliyor — yani kullanıcı gerçek bir reklamı
sonuna kadar izlerse. Reklam yüklenemezse veya kullanıcı atlarsa ödül verilmiyor, "No reward
given" mesajı gösteriliyor. Playwright ile test ettim: reklam SDK'sı yokken (test ortamında
ağ erişimi kısıtlı olduğu için) sistem doğru şekilde ödül vermeden "Ad not available" diyor —
yani artık fail-safe, eskisi gibi her durumda otomatik ödül vermiyor.

Bu sayfalarda zaten normal AdSense display reklamları (`pub-3359266836868361`) yüklü
olduğundan ek bir reklam birimi eklemenize gerek yok, aynı AdSense hesabı reward reklamları
için de kullanılacak — ama reward reklam envanterinin gösterilip gösterilmeyeceği (doldurulup
doldurulmayacağı) tamamen Google'ın o anki envanterine bağlı; hiç reklam yoksa kullanıcı
sadece "Ad not available" görür, bu normal ve politika açısından güvenli bir davranış.

## 2) sitemap.xml — kontrol ettim, sorun yok

Mevcut sitemap.xml'i inceledim: 97 URL var, hepsi `/games/{slug}/` yapısındaki kanonik
sayfalara işaret ediyor (düz `.html` dosyalarına veya `/chess-puzzles/` gibi alternatif
klasörlere değil). Bu doğru ve iyi — Google'a hangi URL'lerin "asıl" sayfa olduğunu doğru
şekilde söylüyor. Bu dosyada herhangi bir değişiklik yapmadım, referans için pakete ekledim.

## 3) Henüz çözülmemiş, sizin kararınızı gerektiren konu (bu pakette dokunmadım)

İncelerken şunu da gördüm: bu 13 düz `.html` dosyası (ve reponuzdaki benzer diğer düz oyun
dosyaları) kendi kendilerini "canonical" ilan ediyor ve `robots: index,follow` diyor —
yani Google'a "beni de ayrı bir sayfa olarak indeksle" diyorlar. Ama aynı oyunun içeriği
`/games/{slug}/` altında da (muhtemelen gerçek kanonik hedef) var. Bu, "Low value content"
uyarısının muhtemel asıl nedeni: aynı oyun için birden fazla indekslenebilir URL.

Bunu düzeltmek mimari bir karar gerektiriyor (ya bu düz dosyaları `/games/{slug}/`'a 301
yönlendirmek, ya da `noindex` + canonical'ı `/games/{slug}/`'a çevirmek) ve reponuzda benden
habersiz çalışan başka bir AI/araç olduğu için bunu sormadan tek taraflı yapmak istemedim.
Hazır olduğunuzda bu konuyu da netleştirip ikinci bir pakette çözebilirim.
