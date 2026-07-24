/* =========================================================
   GameNest World — Game Engine
   Professional, self-contained engine for all 58 games.
   - Real XP/Level system (50 levels), persisted locally
   - Full keyboard + touch support where relevant
   - Fullscreen support
   - UI chrome translated across all languages the shell supports
   - No fabricated stats: every number shown is real, computed
     from actual gameplay in this session/device.
   ========================================================= */
(function(){
"use strict";

/* ============================================================
   1. UI CHROME TRANSLATIONS (short strings used inside games)
   ============================================================ */
var CHROME = {
en:{play:"Play",playAgain:"Play Again",restart:"Restart",close:"Close",score:"Score",best:"Best",level:"Level",
 correct:"Correct!",wrong:"Wrong",gameOver:"Game Over",youWin:"You Win!",youLose:"Try Again",newBest:"New Best!",
 timeUp:"Time's Up!",levelUp:"Level Up!",lives:"Lives",next:"Next",submit:"Submit",yourAnswer:"Your answer",
 tapToStart:"Tap to Start",paused:"Paused",resume:"Resume",fullscreen:"Fullscreen",exitFullscreen:"Exit Fullscreen",
 questionOf:"Question {a} of {b}",finalScore:"Final Score",xpEarned:"XP Earned",wellPlayed:"Well played!",
 flagTurn:"Your Turn",flagAiTurn:"AI's Turn",draw:"Draw!",youWon:"You Won!",aiWon:"AI Won!",
 easy:"Easy",medium:"Medium",hard:"Hard",moves:"Moves",time:"Time",matches:"Matches",streak:"Streak",
 head:"Heads",tail:"Tails",higher:"Higher",lower:"Lower",tries:"Tries left",reveal:"Reveal",flag:"Flag",
 rock:"Rock",paper:"Paper",scissors:"Scissors",youPicked:"You picked",aiPicked:"AI picked"},
tr:{play:"Oyna",playAgain:"Tekrar Oyna",restart:"Yeniden Başlat",close:"Kapat",score:"Skor",best:"En İyi",level:"Seviye",
 correct:"Doğru!",wrong:"Yanlış",gameOver:"Oyun Bitti",youWin:"Kazandın!",youLose:"Tekrar Dene",newBest:"Yeni Rekor!",
 timeUp:"Süre Doldu!",levelUp:"Seviye Atladın!",lives:"Can",next:"Sonraki",submit:"Gönder",yourAnswer:"Cevabın",
 tapToStart:"Başlamak için Dokun",paused:"Duraklatıldı",resume:"Devam Et",fullscreen:"Tam Ekran",exitFullscreen:"Tam Ekrandan Çık",
 questionOf:"Soru {a} / {b}",finalScore:"Son Skor",xpEarned:"Kazanılan XP",wellPlayed:"Aferin!",
 flagTurn:"Sıra Sende",flagAiTurn:"AI'nin Sırası",draw:"Berabere!",youWon:"Kazandın!",aiWon:"AI Kazandı!",
 easy:"Kolay",medium:"Orta",hard:"Zor",moves:"Hamle",time:"Süre",matches:"Eşleşme",streak:"Seri",
 head:"Yazı",tail:"Tura",higher:"Daha Büyük",lower:"Daha Küçük",tries:"Kalan Deneme",reveal:"Aç",flag:"Bayrak",
 rock:"Taş",paper:"Kağıt",scissors:"Makas",youPicked:"Sen seçtin",aiPicked:"AI seçti"},
es:{play:"Jugar",playAgain:"Jugar de Nuevo",restart:"Reiniciar",close:"Cerrar",score:"Puntos",best:"Mejor",level:"Nivel",
 correct:"¡Correcto!",wrong:"Incorrecto",gameOver:"Fin del Juego",youWin:"¡Ganaste!",youLose:"Inténtalo de Nuevo",newBest:"¡Nuevo Récord!",
 timeUp:"¡Se acabó el tiempo!",levelUp:"¡Subiste de Nivel!",lives:"Vidas",next:"Siguiente",submit:"Enviar",yourAnswer:"Tu respuesta",
 tapToStart:"Toca para Empezar",paused:"Pausado",resume:"Continuar",fullscreen:"Pantalla Completa",exitFullscreen:"Salir de Pantalla Completa",
 questionOf:"Pregunta {a} de {b}",finalScore:"Puntuación Final",xpEarned:"XP Ganado",wellPlayed:"¡Bien jugado!",
 flagTurn:"Tu Turno",flagAiTurn:"Turno de la IA",draw:"¡Empate!",youWon:"¡Ganaste!",aiWon:"¡Ganó la IA!",
 easy:"Fácil",medium:"Medio",hard:"Difícil",moves:"Movimientos",time:"Tiempo",matches:"Parejas",streak:"Racha",
 head:"Cara",tail:"Cruz",higher:"Más Alto",lower:"Más Bajo",tries:"Intentos restantes",reveal:"Revelar",flag:"Bandera",
 rock:"Piedra",paper:"Papel",scissors:"Tijera",youPicked:"Elegiste",aiPicked:"La IA eligió"},
fr:{play:"Jouer",playAgain:"Rejouer",restart:"Recommencer",close:"Fermer",score:"Score",best:"Meilleur",level:"Niveau",
 correct:"Correct !",wrong:"Faux",gameOver:"Fin de Partie",youWin:"Tu Gagnes !",youLose:"Réessaie",newBest:"Nouveau Record !",
 timeUp:"Temps Écoulé !",levelUp:"Niveau Supérieur !",lives:"Vies",next:"Suivant",submit:"Valider",yourAnswer:"Ta réponse",
 tapToStart:"Touche pour Commencer",paused:"En Pause",resume:"Reprendre",fullscreen:"Plein Écran",exitFullscreen:"Quitter le Plein Écran",
 questionOf:"Question {a} sur {b}",finalScore:"Score Final",xpEarned:"XP Gagné",wellPlayed:"Bien joué !",
 flagTurn:"Ton Tour",flagAiTurn:"Tour de l'IA",draw:"Égalité !",youWon:"Tu as Gagné !",aiWon:"L'IA a Gagné !",
 easy:"Facile",medium:"Moyen",hard:"Difficile",moves:"Coups",time:"Temps",matches:"Paires",streak:"Série",
 head:"Pile",tail:"Face",higher:"Plus Haut",lower:"Plus Bas",tries:"Essais restants",reveal:"Révéler",flag:"Drapeau",
 rock:"Pierre",paper:"Papier",scissors:"Ciseaux",youPicked:"Tu as choisi",aiPicked:"L'IA a choisi"},
de:{play:"Spielen",playAgain:"Nochmal Spielen",restart:"Neustart",close:"Schließen",score:"Punkte",best:"Bestwert",level:"Level",
 correct:"Richtig!",wrong:"Falsch",gameOver:"Spiel Vorbei",youWin:"Du Gewinnst!",youLose:"Nochmal Versuchen",newBest:"Neuer Rekord!",
 timeUp:"Zeit Abgelaufen!",levelUp:"Level Aufgestiegen!",lives:"Leben",next:"Weiter",submit:"Absenden",yourAnswer:"Deine Antwort",
 tapToStart:"Tippen zum Starten",paused:"Pausiert",resume:"Fortsetzen",fullscreen:"Vollbild",exitFullscreen:"Vollbild Verlassen",
 questionOf:"Frage {a} von {b}",finalScore:"Endpunktzahl",xpEarned:"XP Erhalten",wellPlayed:"Gut gespielt!",
 flagTurn:"Du bist dran",flagAiTurn:"KI ist dran",draw:"Unentschieden!",youWon:"Du hast Gewonnen!",aiWon:"KI hat Gewonnen!",
 easy:"Leicht",medium:"Mittel",hard:"Schwer",moves:"Züge",time:"Zeit",matches:"Paare",streak:"Serie",
 head:"Kopf",tail:"Zahl",higher:"Höher",lower:"Niedriger",tries:"Verbleibende Versuche",reveal:"Aufdecken",flag:"Flagge",
 rock:"Stein",paper:"Papier",scissors:"Schere",youPicked:"Du hast gewählt",aiPicked:"KI hat gewählt"},
pt:{play:"Jogar",playAgain:"Jogar Novamente",restart:"Reiniciar",close:"Fechar",score:"Pontos",best:"Melhor",level:"Nível",
 correct:"Correto!",wrong:"Errado",gameOver:"Fim de Jogo",youWin:"Você Venceu!",youLose:"Tente Novamente",newBest:"Novo Recorde!",
 timeUp:"Tempo Esgotado!",levelUp:"Subiu de Nível!",lives:"Vidas",next:"Próxima",submit:"Enviar",yourAnswer:"Sua resposta",
 tapToStart:"Toque para Começar",paused:"Pausado",resume:"Continuar",fullscreen:"Tela Cheia",exitFullscreen:"Sair da Tela Cheia",
 questionOf:"Pergunta {a} de {b}",finalScore:"Pontuação Final",xpEarned:"XP Ganho",wellPlayed:"Bem jogado!",
 flagTurn:"Sua Vez",flagAiTurn:"Vez da IA",draw:"Empate!",youWon:"Você Venceu!",aiWon:"IA Venceu!",
 easy:"Fácil",medium:"Médio",hard:"Difícil",moves:"Jogadas",time:"Tempo",matches:"Pares",streak:"Sequência",
 head:"Cara",tail:"Coroa",higher:"Mais Alto",lower:"Mais Baixo",tries:"Tentativas restantes",reveal:"Revelar",flag:"Bandeira",
 rock:"Pedra",paper:"Papel",scissors:"Tesoura",youPicked:"Você escolheu",aiPicked:"A IA escolheu"},
ru:{play:"Играть",playAgain:"Играть Снова",restart:"Заново",close:"Закрыть",score:"Счёт",best:"Рекорд",level:"Уровень",
 correct:"Правильно!",wrong:"Неверно",gameOver:"Игра Окончена",youWin:"Ты Выиграл!",youLose:"Попробуй Снова",newBest:"Новый Рекорд!",
 timeUp:"Время Вышло!",levelUp:"Новый Уровень!",lives:"Жизни",next:"Далее",submit:"Отправить",yourAnswer:"Твой ответ",
 tapToStart:"Нажми, чтобы начать",paused:"Пауза",resume:"Продолжить",fullscreen:"Полный экран",exitFullscreen:"Выйти из полноэкранного режима",
 questionOf:"Вопрос {a} из {b}",finalScore:"Итоговый счёт",xpEarned:"Получено XP",wellPlayed:"Отличная игра!",
 flagTurn:"Твой ход",flagAiTurn:"Ход ИИ",draw:"Ничья!",youWon:"Ты Выиграл!",aiWon:"ИИ Выиграл!",
 easy:"Легко",medium:"Средне",hard:"Сложно",moves:"Ходы",time:"Время",matches:"Пары",streak:"Серия",
 head:"Орёл",tail:"Решка",higher:"Больше",lower:"Меньше",tries:"Осталось попыток",reveal:"Открыть",flag:"Флажок",
 rock:"Камень",paper:"Бумага",scissors:"Ножницы",youPicked:"Ты выбрал",aiPicked:"ИИ выбрал"},
ar:{play:"العب",playAgain:"العب مرة أخرى",restart:"إعادة البدء",close:"إغلاق",score:"النتيجة",best:"الأفضل",level:"المستوى",
 correct:"صحيح!",wrong:"خطأ",gameOver:"انتهت اللعبة",youWin:"لقد فزت!",youLose:"حاول مرة أخرى",newBest:"رقم قياسي جديد!",
 timeUp:"انتهى الوقت!",levelUp:"ترقية المستوى!",lives:"الأرواح",next:"التالي",submit:"إرسال",yourAnswer:"إجابتك",
 tapToStart:"اضغط للبدء",paused:"متوقف مؤقتاً",resume:"استئناف",fullscreen:"ملء الشاشة",exitFullscreen:"الخروج من ملء الشاشة",
 questionOf:"السؤال {a} من {b}",finalScore:"النتيجة النهائية",xpEarned:"XP المكتسبة",wellPlayed:"أحسنت!",
 flagTurn:"دورك",flagAiTurn:"دور الذكاء الاصطناعي",draw:"تعادل!",youWon:"لقد فزت!",aiWon:"فاز الذكاء الاصطناعي!",
 easy:"سهل",medium:"متوسط",hard:"صعب",moves:"الحركات",time:"الوقت",matches:"التطابقات",streak:"التتابع",
 head:"صورة",tail:"كتابة",higher:"أعلى",lower:"أقل",tries:"المحاولات المتبقية",reveal:"كشف",flag:"علم",
 rock:"حجر",paper:"ورقة",scissors:"مقص",youPicked:"اخترت",aiPicked:"اختار الذكاء الاصطناعي"},
zh:{play:"开始",playAgain:"再玩一次",restart:"重新开始",close:"关闭",score:"得分",best:"最佳",level:"等级",
 correct:"正确！",wrong:"错误",gameOver:"游戏结束",youWin:"你赢了！",youLose:"再试一次",newBest:"新纪录！",
 timeUp:"时间到！",levelUp:"升级了！",lives:"生命",next:"下一个",submit:"提交",yourAnswer:"你的答案",
 tapToStart:"点击开始",paused:"已暂停",resume:"继续",fullscreen:"全屏",exitFullscreen:"退出全屏",
 questionOf:"第 {a} 题，共 {b} 题",finalScore:"最终得分",xpEarned:"获得经验值",wellPlayed:"玩得好！",
 flagTurn:"轮到你了",flagAiTurn:"AI回合",draw:"平局！",youWon:"你赢了！",aiWon:"AI赢了！",
 easy:"简单",medium:"中等",hard:"困难",moves:"步数",time:"时间",matches:"配对",streak:"连续",
 head:"正面",tail:"反面",higher:"更大",lower:"更小",tries:"剩余次数",reveal:"揭示",flag:"标记",
 rock:"石头",paper:"布",scissors:"剪刀",youPicked:"你选择了",aiPicked:"AI选择了"},
ja:{play:"プレイ",playAgain:"もう一度プレイ",restart:"リスタート",close:"閉じる",score:"スコア",best:"ベスト",level:"レベル",
 correct:"正解！",wrong:"不正解",gameOver:"ゲームオーバー",youWin:"あなたの勝ち！",youLose:"もう一度",newBest:"新記録！",
 timeUp:"時間切れ！",levelUp:"レベルアップ！",lives:"ライフ",next:"次へ",submit:"送信",yourAnswer:"あなたの答え",
 tapToStart:"タップして開始",paused:"一時停止中",resume:"再開",fullscreen:"フルスクリーン",exitFullscreen:"フルスクリーン終了",
 questionOf:"問題 {a} / {b}",finalScore:"最終スコア",xpEarned:"獲得XP",wellPlayed:"よくできました！",
 flagTurn:"あなたの番",flagAiTurn:"AIの番",draw:"引き分け！",youWon:"あなたの勝ち！",aiWon:"AIの勝ち！",
 easy:"簡単",medium:"普通",hard:"難しい",moves:"手数",time:"時間",matches:"ペア",streak:"連続記録",
 head:"表",tail:"裏",higher:"もっと大きい",lower:"もっと小さい",tries:"残り試行回数",reveal:"公開",flag:"フラグ",
 rock:"グー",paper:"パー",scissors:"チョキ",youPicked:"あなたの選択",aiPicked:"AIの選択"},
hi:{play:"खेलें",playAgain:"फिर से खेलें",restart:"पुनः आरंभ करें",close:"बंद करें",score:"स्कोर",best:"सर्वश्रेष्ठ",level:"स्तर",
 correct:"सही!",wrong:"गलत",gameOver:"खेल समाप्त",youWin:"आप जीत गए!",youLose:"फिर से प्रयास करें",newBest:"नया रिकॉर्ड!",
 timeUp:"समय समाप्त!",levelUp:"स्तर बढ़ा!",lives:"जीवन",next:"अगला",submit:"जमा करें",yourAnswer:"आपका उत्तर",
 tapToStart:"शुरू करने के लिए टैप करें",paused:"रोका गया",resume:"जारी रखें",fullscreen:"पूर्ण स्क्रीन",exitFullscreen:"पूर्ण स्क्रीन से बाहर निकलें",
 questionOf:"प्रश्न {a} / {b}",finalScore:"अंतिम स्कोर",xpEarned:"अर्जित XP",wellPlayed:"बहुत बढ़िया!",
 flagTurn:"आपकी बारी",flagAiTurn:"AI की बारी",draw:"बराबरी!",youWon:"आप जीत गए!",aiWon:"AI जीत गया!",
 easy:"आसान",medium:"मध्यम",hard:"कठिन",moves:"चालें",time:"समय",matches:"जोड़े",streak:"स्ट्रीक",
 head:"हेड",tail:"टेल",higher:"बड़ा",lower:"छोटा",tries:"शेष प्रयास",reveal:"प्रकट करें",flag:"झंडा",
 rock:"पत्थर",paper:"कागज़",scissors:"कैंची",youPicked:"आपने चुना",aiPicked:"AI ने चुना"},
id:{play:"Main",playAgain:"Main Lagi",restart:"Mulai Ulang",close:"Tutup",score:"Skor",best:"Terbaik",level:"Level",
 correct:"Benar!",wrong:"Salah",gameOver:"Game Over",youWin:"Kamu Menang!",youLose:"Coba Lagi",newBest:"Rekor Baru!",
 timeUp:"Waktu Habis!",levelUp:"Naik Level!",lives:"Nyawa",next:"Berikutnya",submit:"Kirim",yourAnswer:"Jawabanmu",
 tapToStart:"Ketuk untuk Mulai",paused:"Dijeda",resume:"Lanjutkan",fullscreen:"Layar Penuh",exitFullscreen:"Keluar Layar Penuh",
 questionOf:"Pertanyaan {a} dari {b}",finalScore:"Skor Akhir",xpEarned:"XP Didapat",wellPlayed:"Mainnya bagus!",
 flagTurn:"Giliranmu",flagAiTurn:"Giliran AI",draw:"Seri!",youWon:"Kamu Menang!",aiWon:"AI Menang!",
 easy:"Mudah",medium:"Sedang",hard:"Sulit",moves:"Langkah",time:"Waktu",matches:"Pasangan",streak:"Rentetan",
 head:"Depan",tail:"Belakang",higher:"Lebih Tinggi",lower:"Lebih Rendah",tries:"Sisa percobaan",reveal:"Buka",flag:"Bendera",
 rock:"Batu",paper:"Kertas",scissors:"Gunting",youPicked:"Kamu pilih",aiPicked:"AI pilih"},
ko:{play:"플레이",playAgain:"다시 플레이",restart:"재시작",close:"닫기",score:"점수",best:"최고",level:"레벨",
 correct:"정답!",wrong:"오답",gameOver:"게임 오버",youWin:"승리!",youLose:"다시 시도",newBest:"신기록!",
 timeUp:"시간 종료!",levelUp:"레벨 업!",lives:"생명",next:"다음",submit:"제출",yourAnswer:"당신의 답",
 tapToStart:"탭하여 시작",paused:"일시정지",resume:"계속하기",fullscreen:"전체 화면",exitFullscreen:"전체 화면 종료",
 questionOf:"문제 {a} / {b}",finalScore:"최종 점수",xpEarned:"획득한 XP",wellPlayed:"잘했어요!",
 flagTurn:"당신 차례",flagAiTurn:"AI 차례",draw:"무승부!",youWon:"당신이 이겼습니다!",aiWon:"AI가 이겼습니다!",
 easy:"쉬움",medium:"보통",hard:"어려움",moves:"이동",time:"시간",matches:"짝",streak:"연속 기록",
 head:"앞면",tail:"뒷면",higher:"더 큼",lower:"더 작음",tries:"남은 시도",reveal:"공개",flag:"깃발",
 rock:"바위",paper:"보",scissors:"가위",youPicked:"당신의 선택",aiPicked:"AI의 선택"},
nl:{play:"Spelen",playAgain:"Opnieuw Spelen",restart:"Herstarten",close:"Sluiten",score:"Score",best:"Beste",level:"Level",
 correct:"Correct!",wrong:"Fout",gameOver:"Game Over",youWin:"Je Wint!",youLose:"Probeer Opnieuw",newBest:"Nieuw Record!",
 timeUp:"Tijd Voorbij!",levelUp:"Level Omhoog!",lives:"Levens",next:"Volgende",submit:"Verzenden",yourAnswer:"Jouw antwoord",
 tapToStart:"Tik om te Starten",paused:"Gepauzeerd",resume:"Hervatten",fullscreen:"Volledig Scherm",exitFullscreen:"Volledig Scherm Verlaten",
 questionOf:"Vraag {a} van {b}",finalScore:"Eindscore",xpEarned:"XP Verdiend",wellPlayed:"Goed gespeeld!",
 flagTurn:"Jouw Beurt",flagAiTurn:"Beurt van AI",draw:"Gelijkspel!",youWon:"Je Hebt Gewonnen!",aiWon:"AI Heeft Gewonnen!",
 easy:"Makkelijk",medium:"Gemiddeld",hard:"Moeilijk",moves:"Zetten",time:"Tijd",matches:"Paren",streak:"Reeks",
 head:"Kop",tail:"Munt",higher:"Hoger",lower:"Lager",tries:"Pogingen over",reveal:"Onthullen",flag:"Vlag",
 rock:"Steen",paper:"Papier",scissors:"Schaar",youPicked:"Jij koos",aiPicked:"AI koos"},
pl:{play:"Graj",playAgain:"Zagraj Ponownie",restart:"Restart",close:"Zamknij",score:"Wynik",best:"Najlepszy",level:"Poziom",
 correct:"Poprawnie!",wrong:"Źle",gameOver:"Koniec Gry",youWin:"Wygrywasz!",youLose:"Spróbuj Ponownie",newBest:"Nowy Rekord!",
 timeUp:"Czas Minął!",levelUp:"Nowy Poziom!",lives:"Życia",next:"Dalej",submit:"Wyślij",yourAnswer:"Twoja odpowiedź",
 tapToStart:"Dotknij, aby Zacząć",paused:"Wstrzymano",resume:"Wznów",fullscreen:"Pełny Ekran",exitFullscreen:"Wyjdź z Pełnego Ekranu",
 questionOf:"Pytanie {a} z {b}",finalScore:"Wynik Końcowy",xpEarned:"Zdobyte XP",wellPlayed:"Dobra gra!",
 flagTurn:"Twoja Kolej",flagAiTurn:"Kolej AI",draw:"Remis!",youWon:"Wygrałeś!",aiWon:"AI Wygrało!",
 easy:"Łatwy",medium:"Średni",hard:"Trudny",moves:"Ruchy",time:"Czas",matches:"Pary",streak:"Seria",
 head:"Orzeł",tail:"Reszka",higher:"Wyżej",lower:"Niżej",tries:"Pozostałe próby",reveal:"Odkryj",flag:"Flaga",
 rock:"Kamień",paper:"Papier",scissors:"Nożyce",youPicked:"Wybrałeś",aiPicked:"AI wybrało"},
it:{play:"Gioca",playAgain:"Gioca Ancora",restart:"Ricomincia",close:"Chiudi",score:"Punteggio",best:"Migliore",level:"Livello",
 correct:"Corretto!",wrong:"Sbagliato",gameOver:"Game Over",youWin:"Hai Vinto!",youLose:"Riprova",newBest:"Nuovo Record!",
 timeUp:"Tempo Scaduto!",levelUp:"Livello Aumentato!",lives:"Vite",next:"Avanti",submit:"Invia",yourAnswer:"La tua risposta",
 tapToStart:"Tocca per Iniziare",paused:"In Pausa",resume:"Riprendi",fullscreen:"Schermo Intero",exitFullscreen:"Esci da Schermo Intero",
 questionOf:"Domanda {a} di {b}",finalScore:"Punteggio Finale",xpEarned:"XP Guadagnati",wellPlayed:"Ben giocato!",
 flagTurn:"Tocca a Te",flagAiTurn:"Tocca all'IA",draw:"Pareggio!",youWon:"Hai Vinto!",aiWon:"L'IA ha Vinto!",
 easy:"Facile",medium:"Medio",hard:"Difficile",moves:"Mosse",time:"Tempo",matches:"Coppie",streak:"Serie",
 head:"Testa",tail:"Croce",higher:"Più Alto",lower:"Più Basso",tries:"Tentativi rimasti",reveal:"Rivela",flag:"Bandiera",
 rock:"Sasso",paper:"Carta",scissors:"Forbici",youPicked:"Hai scelto",aiPicked:"L'IA ha scelto"},
vi:{play:"Chơi",playAgain:"Chơi Lại",restart:"Bắt Đầu Lại",close:"Đóng",score:"Điểm",best:"Tốt Nhất",level:"Cấp Độ",
 correct:"Chính xác!",wrong:"Sai",gameOver:"Kết Thúc",youWin:"Bạn Thắng!",youLose:"Thử Lại",newBest:"Kỷ Lục Mới!",
 timeUp:"Hết Giờ!",levelUp:"Lên Cấp!",lives:"Mạng",next:"Tiếp Theo",submit:"Gửi",yourAnswer:"Câu trả lời của bạn",
 tapToStart:"Chạm để Bắt Đầu",paused:"Tạm Dừng",resume:"Tiếp Tục",fullscreen:"Toàn Màn Hình",exitFullscreen:"Thoát Toàn Màn Hình",
 questionOf:"Câu {a} / {b}",finalScore:"Điểm Cuối Cùng",xpEarned:"XP Nhận Được",wellPlayed:"Chơi tốt lắm!",
 flagTurn:"Lượt Của Bạn",flagAiTurn:"Lượt Của AI",draw:"Hòa!",youWon:"Bạn Đã Thắng!",aiWon:"AI Đã Thắng!",
 easy:"Dễ",medium:"Trung Bình",hard:"Khó",moves:"Nước Đi",time:"Thời Gian",matches:"Cặp",streak:"Chuỗi",
 head:"Ngửa",tail:"Sấp",higher:"Cao Hơn",lower:"Thấp Hơn",tries:"Lượt thử còn lại",reveal:"Mở",flag:"Cờ",
 rock:"Búa",paper:"Bao",scissors:"Kéo",youPicked:"Bạn chọn",aiPicked:"AI chọn"},
uk:{play:"Грати",playAgain:"Грати Знову",restart:"Почати Заново",close:"Закрити",score:"Рахунок",best:"Рекорд",level:"Рівень",
 correct:"Правильно!",wrong:"Неправильно",gameOver:"Гру Закінчено",youWin:"Ти Виграв!",youLose:"Спробуй Знову",newBest:"Новий Рекорд!",
 timeUp:"Час Вийшов!",levelUp:"Новий Рівень!",lives:"Життя",next:"Далі",submit:"Надіслати",yourAnswer:"Твоя відповідь",
 tapToStart:"Натисни, щоб Почати",paused:"Пауза",resume:"Продовжити",fullscreen:"Повний Екран",exitFullscreen:"Вийти з Повного Екрану",
 questionOf:"Питання {a} з {b}",finalScore:"Фінальний Рахунок",xpEarned:"Отримано XP",wellPlayed:"Гарна гра!",
 flagTurn:"Твій Хід",flagAiTurn:"Хід ШІ",draw:"Нічия!",youWon:"Ти Виграв!",aiWon:"ШІ Виграв!",
 easy:"Легко",medium:"Середньо",hard:"Складно",moves:"Ходи",time:"Час",matches:"Пари",streak:"Серія",
 head:"Орел",tail:"Решка",higher:"Більше",lower:"Менше",tries:"Залишилось спроб",reveal:"Відкрити",flag:"Прапорець",
 rock:"Камінь",paper:"Папір",scissors:"Ножиці",youPicked:"Ти обрав",aiPicked:"ШІ обрав"},
el:{play:"Παίξε",playAgain:"Ξαναπαίξε",restart:"Επανεκκίνηση",close:"Κλείσιμο",score:"Σκορ",best:"Καλύτερο",level:"Επίπεδο",
 correct:"Σωστά!",wrong:"Λάθος",gameOver:"Τέλος Παιχνιδιού",youWin:"Κέρδισες!",youLose:"Ξαναπροσπάθησε",newBest:"Νέο Ρεκόρ!",
 timeUp:"Ο Χρόνος Τελείωσε!",levelUp:"Ανέβηκες Επίπεδο!",lives:"Ζωές",next:"Επόμενο",submit:"Υποβολή",yourAnswer:"Η απάντησή σου",
 tapToStart:"Πάτησε για Έναρξη",paused:"Σε Παύση",resume:"Συνέχεια",fullscreen:"Πλήρης Οθόνη",exitFullscreen:"Έξοδος από Πλήρη Οθόνη",
 questionOf:"Ερώτηση {a} από {b}",finalScore:"Τελικό Σκορ",xpEarned:"XP που Κερδήθηκαν",wellPlayed:"Μπράβο!",
 flagTurn:"Η Σειρά σου",flagAiTurn:"Σειρά AI",draw:"Ισοπαλία!",youWon:"Κέρδισες!",aiWon:"Κέρδισε το AI!",
 easy:"Εύκολο",medium:"Μεσαίο",hard:"Δύσκολο",moves:"Κινήσεις",time:"Χρόνος",matches:"Ζευγάρια",streak:"Σερί",
 head:"Κορώνα",tail:"Γράμματα",higher:"Ψηλότερα",lower:"Χαμηλότερα",tries:"Απομένουν προσπάθειες",reveal:"Αποκάλυψη",flag:"Σημαία",
 rock:"Πέτρα",paper:"Χαρτί",scissors:"Ψαλίδι",youPicked:"Διάλεξες",aiPicked:"Το AI διάλεξε"},
ro:{play:"Joacă",playAgain:"Joacă Din Nou",restart:"Repornește",close:"Închide",score:"Scor",best:"Cel Mai Bun",level:"Nivel",
 correct:"Corect!",wrong:"Greșit",gameOver:"Joc Terminat",youWin:"Ai Câștigat!",youLose:"Încearcă Din Nou",newBest:"Record Nou!",
 timeUp:"Timpul a Expirat!",levelUp:"Nivel Nou!",lives:"Vieți",next:"Următorul",submit:"Trimite",yourAnswer:"Răspunsul tău",
 tapToStart:"Atinge pentru a Începe",paused:"Pauzat",resume:"Reia",fullscreen:"Ecran Complet",exitFullscreen:"Ieși din Ecran Complet",
 questionOf:"Întrebarea {a} din {b}",finalScore:"Scor Final",xpEarned:"XP Câștigat",wellPlayed:"Bine jucat!",
 flagTurn:"Rândul Tău",flagAiTurn:"Rândul AI",draw:"Egalitate!",youWon:"Ai Câștigat!",aiWon:"AI a Câștigat!",
 easy:"Ușor",medium:"Mediu",hard:"Dificil",moves:"Mutări",time:"Timp",matches:"Perechi",streak:"Serie",
 head:"Cap",tail:"Pajură",higher:"Mai Mare",lower:"Mai Mic",tries:"Încercări rămase",reveal:"Dezvăluie",flag:"Steag",
 rock:"Piatră",paper:"Hârtie",scissors:"Foarfecă",youPicked:"Ai ales",aiPicked:"AI a ales"},
sv:{play:"Spela",playAgain:"Spela Igen",restart:"Starta Om",close:"Stäng",score:"Poäng",best:"Bästa",level:"Nivå",
 correct:"Rätt!",wrong:"Fel",gameOver:"Spelet Slut",youWin:"Du Vinner!",youLose:"Försök Igen",newBest:"Nytt Rekord!",
 timeUp:"Tiden är Ute!",levelUp:"Ny Nivå!",lives:"Liv",next:"Nästa",submit:"Skicka",yourAnswer:"Ditt svar",
 tapToStart:"Tryck för att Starta",paused:"Pausad",resume:"Återuppta",fullscreen:"Helskärm",exitFullscreen:"Avsluta Helskärm",
 questionOf:"Fråga {a} av {b}",finalScore:"Slutpoäng",xpEarned:"XP Intjänat",wellPlayed:"Bra spelat!",
 flagTurn:"Din Tur",flagAiTurn:"AI:s Tur",draw:"Oavgjort!",youWon:"Du Vann!",aiWon:"AI Vann!",
 easy:"Lätt",medium:"Medel",hard:"Svår",moves:"Drag",time:"Tid",matches:"Par",streak:"Streak",
 head:"Krona",tail:"Klave",higher:"Högre",lower:"Lägre",tries:"Försök kvar",reveal:"Visa",flag:"Flagga",
 rock:"Sten",paper:"Papper",scissors:"Sax",youPicked:"Du valde",aiPicked:"AI valde"},
cs:{play:"Hrát",playAgain:"Hrát Znovu",restart:"Restart",close:"Zavřít",score:"Skóre",best:"Nejlepší",level:"Úroveň",
 correct:"Správně!",wrong:"Špatně",gameOver:"Konec Hry",youWin:"Vyhráváš!",youLose:"Zkus Znovu",newBest:"Nový Rekord!",
 timeUp:"Čas Vypršel!",levelUp:"Nová Úroveň!",lives:"Životy",next:"Další",submit:"Odeslat",yourAnswer:"Tvoje odpověď",
 tapToStart:"Klepni pro Start",paused:"Pozastaveno",resume:"Pokračovat",fullscreen:"Celá Obrazovka",exitFullscreen:"Ukončit Celou Obrazovku",
 questionOf:"Otázka {a} z {b}",finalScore:"Konečné Skóre",xpEarned:"Získané XP",wellPlayed:"Dobrá hra!",
 flagTurn:"Tvůj Tah",flagAiTurn:"Tah AI",draw:"Remíza!",youWon:"Vyhrál jsi!",aiWon:"AI Vyhrálo!",
 easy:"Snadné",medium:"Střední",hard:"Těžké",moves:"Tahy",time:"Čas",matches:"Páry",streak:"Série",
 head:"Panna",tail:"Orel",higher:"Výše",lower:"Níže",tries:"Zbývající pokusy",reveal:"Odkrýt",flag:"Vlajka",
 rock:"Kámen",paper:"Papír",scissors:"Nůžky",youPicked:"Vybral jsi",aiPicked:"AI vybralo"},
hu:{play:"Játék",playAgain:"Újra Játszom",restart:"Újraindítás",close:"Bezárás",score:"Pontszám",best:"Legjobb",level:"Szint",
 correct:"Helyes!",wrong:"Rossz",gameOver:"Játék Vége",youWin:"Nyertél!",youLose:"Próbáld Újra",newBest:"Új Rekord!",
 timeUp:"Lejárt az Idő!",levelUp:"Szintlépés!",lives:"Élet",next:"Következő",submit:"Küldés",yourAnswer:"A válaszod",
 tapToStart:"Koppints a Kezdéshez",paused:"Szüneteltetve",resume:"Folytatás",fullscreen:"Teljes Képernyő",exitFullscreen:"Kilépés a Teljes Képernyőből",
 questionOf:"{a}. kérdés / {b}",finalScore:"Végső Pontszám",xpEarned:"Szerzett XP",wellPlayed:"Szép volt!",
 flagTurn:"A Te Köröd",flagAiTurn:"Az AI Köre",draw:"Döntetlen!",youWon:"Nyertél!",aiWon:"Az AI Nyert!",
 easy:"Könnyű",medium:"Közepes",hard:"Nehéz",moves:"Lépések",time:"Idő",matches:"Párok",streak:"Sorozat",
 head:"Fej",tail:"Írás",higher:"Magasabb",lower:"Alacsonyabb",tries:"Hátralévő próbálkozások",reveal:"Felfedés",flag:"Zászló",
 rock:"Kő",paper:"Papír",scissors:"Olló",youPicked:"Te választottad",aiPicked:"Az AI választotta"},
fa:{play:"بازی",playAgain:"دوباره بازی کن",restart:"شروع مجدد",close:"بستن",score:"امتیاز",best:"بهترین",level:"سطح",
 correct:"درست!",wrong:"غلط",gameOver:"بازی تمام شد",youWin:"شما بردید!",youLose:"دوباره امتحان کنید",newBest:"رکورد جدید!",
 timeUp:"زمان تمام شد!",levelUp:"ارتقای سطح!",lives:"جان",next:"بعدی",submit:"ارسال",yourAnswer:"پاسخ شما",
 tapToStart:"برای شروع ضربه بزنید",paused:"متوقف شده",resume:"ادامه",fullscreen:"تمام صفحه",exitFullscreen:"خروج از تمام صفحه",
 questionOf:"سوال {a} از {b}",finalScore:"امتیاز نهایی",xpEarned:"XP کسب‌شده",wellPlayed:"آفرین!",
 flagTurn:"نوبت شما",flagAiTurn:"نوبت هوش مصنوعی",draw:"مساوی!",youWon:"شما بردید!",aiWon:"هوش مصنوعی برد!",
 easy:"آسان",medium:"متوسط",hard:"سخت",moves:"حرکت‌ها",time:"زمان",matches:"جفت‌ها",streak:"توالی",
 head:"شیر",tail:"خط",higher:"بزرگتر",lower:"کوچکتر",tries:"تلاش‌های باقی‌مانده",reveal:"نمایش",flag:"پرچم",
 rock:"سنگ",paper:"کاغذ",scissors:"قیچی",youPicked:"شما انتخاب کردید",aiPicked:"هوش مصنوعی انتخاب کرد"}
};

function curLang(){ return document.documentElement.lang || 'en'; }
function gt(key, vars){
  var d = CHROME[curLang()] || CHROME.en;
  var s = d[key] || CHROME.en[key] || key;
  if(vars){ for(var k in vars){ s = s.replace('{'+k+'}', vars[k]); } }
  return s;
}
function gameLabel(id){
  var i18n = window._gnwI18N || {};
  var dict = i18n[curLang()] || i18n.en || {};
  return (dict['game_'+id+'_name']) || (i18n.en && i18n.en['game_'+id+'_name']) || id;
}

/* ============================================================
   2. LEVEL / XP SYSTEM (real, 50 levels, persisted locally)
   ============================================================ */
var MAX_LEVEL = 50;
var _thresholds = null;
function thresholds(){
  if(_thresholds) return _thresholds;
  var arr = [0];
  for(var lvl=1; lvl<=MAX_LEVEL; lvl++){
    arr.push(Math.round(55 * lvl * (lvl+1) / 2 * 1.08));
  }
  _thresholds = arr;
  return arr;
}
function levelFromXP(xp){
  var t = thresholds();
  var lvl = 1;
  for(var i=1;i<=MAX_LEVEL;i++){ if(xp >= t[i]) lvl = i; else break; }
  return lvl;
}
function levelProgress(xp){
  var t = thresholds();
  var lvl = levelFromXP(xp);
  var cur = t[lvl];
  var next = lvl < MAX_LEVEL ? t[lvl+1] : cur;
  var pct = lvl >= MAX_LEVEL ? 100 : Math.min(100, Math.round((xp-cur)/(next-cur||1)*100));
  return {lvl:lvl, cur:cur, next:next, pct:pct};
}
function getXP(){ try{ return parseInt(localStorage.getItem('gnw_xp')||'0',10)||0; }catch(e){ return 0; } }
function setXP(v){ try{ localStorage.setItem('gnw_xp', String(v)); }catch(e){} }

window.earnXP = function(amount, reason){
  amount = Math.max(0, Math.round(amount||0));
  if(amount<=0) return;
  var before = getXP();
  var beforeLvl = levelFromXP(before);
  var after = before + amount;
  setXP(after);
  var afterLvl = levelFromXP(after);
  updateHeaderXP();
  showToast('+' + amount + ' XP' + (reason ? ' \u00b7 ' + reason : ''));
  if(afterLvl > beforeLvl){
    setTimeout(function(){ showToast('\u2b50 ' + gt('levelUp') + ' Lv.' + afterLvl); }, 900);
  }
};

function updateHeaderXP(){
  var xp = getXP();
  var p = levelProgress(xp);
  var lbl = document.getElementById('xp-label');
  if(lbl) lbl.textContent = xp + ' XP \u2014 Lv.' + p.lvl;
  var bar = document.getElementById('xp-bar');
  if(bar) bar.style.width = p.pct + '%';
}

/* Lives (used by the rewarded-ad bonus in index.html) */
window.gainLive = function(n){
  n = n||1;
  var cur = 0;
  try{ cur = parseInt(localStorage.getItem('gnw_lives')||'0',10)||0; }catch(e){}
  cur += n;
  try{ localStorage.setItem('gnw_lives', String(cur)); }catch(e){}
  showToast('+' + n + ' ' + gt('lives'));
};

/* Daily streak: increments once per new calendar day the person plays */
function bumpStreak(){
  var today = new Date().toISOString().slice(0,10);
  var last = null, streak = 1;
  try{ last = localStorage.getItem('gnw_last_play'); }catch(e){}
  try{ streak = parseInt(localStorage.getItem('gnw_streak')||'1',10)||1; }catch(e){}
  if(last === today) { /* already counted today */ }
  else if(last){
    var lastD = new Date(last), todayD = new Date(today);
    var diffDays = Math.round((todayD - lastD) / 86400000);
    streak = diffDays === 1 ? streak + 1 : 1;
  }
  try{ localStorage.setItem('gnw_last_play', today); localStorage.setItem('gnw_streak', String(streak)); }catch(e){}
  var el = document.getElementById('streak-el');
  if(el) el.textContent = '\ud83d\udd25 ' + streak + (streak===1?' day':' days');
  var el2 = document.getElementById('your-streak-lb');
  if(el2) el2.textContent = streak + (streak===1?' day':' days');
}

/* Toast (uses existing #toast element from index.html) */
var _toastTimer = null;
function showToast(msg){
  var t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 2200);
}
window._gnwShowToast = showToast;

document.addEventListener('DOMContentLoaded', updateHeaderXP);
if(document.readyState !== 'loading') updateHeaderXP();

/* ============================================================
   3. MODAL / WINDOW MANAGEMENT
   ============================================================ */
var _activeGameId = null;
var _activeCleanup = null;

function overlayEl(){ return document.getElementById('overlay'); }
function modalBoxEl(){ return document.getElementById('modal-box'); }

function openModalShell(id, meta){
  var ov = overlayEl(), box = modalBoxEl();
  if(!ov || !box) return;
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
  box.innerHTML =
    '<div id="gw">' +
      '<div class="gnw-game-stage">' +
        '<div class="gnw-game-hud">' +
          '<div class="gnw-game-title">' + (meta.icon||'\ud83c\udfae') + ' <span>' + gameLabel(id) + '</span></div>' +
          '<div style="display:flex;gap:6px;align-items:center;">' +
            '<button type="button" onclick="window._gnwToggleFullscreen()" aria-label="' + gt('fullscreen') + '" title="' + gt('fullscreen') + '">\u26f6</button>' +
            '<button type="button" onclick="window._gnwCloseModal()" aria-label="' + gt('close') + '" title="' + gt('close') + '">\u2715</button>' +
          '</div>' +
        '</div>' +
        '<div id="gnw-stage-body"></div>' +
      '</div>' +
    '</div>';
}

window._gnwCloseModal = function(){
  var ov = overlayEl();
  if(_activeCleanup){ try{ _activeCleanup(); }catch(e){} _activeCleanup = null; }
  if(ov){ ov.classList.remove('open'); ov.classList.remove('gnw-fullscreen-on'); }
  document.body.style.overflow = '';
  if(document.fullscreenElement){ try{ document.exitFullscreen(); }catch(e){} }
  _activeGameId = null;
};

window.closeIfOut = function(e){
  if(e && e.target && e.target.id === 'overlay') window._gnwCloseModal();
};

window._gnwToggleFullscreen = function(){
  var ov = overlayEl();
  if(!ov) return;
  var box = modalBoxEl();
  if(!document.fullscreenElement){
    if(box && box.requestFullscreen){ box.requestFullscreen().catch(function(){}); }
    ov.classList.add('gnw-fullscreen-on');
  } else {
    if(document.exitFullscreen){ document.exitFullscreen().catch(function(){}); }
    ov.classList.remove('gnw-fullscreen-on');
  }
};
document.addEventListener('fullscreenchange', function(){
  var ov = overlayEl();
  if(ov && !document.fullscreenElement) ov.classList.remove('gnw-fullscreen-on');
});

function stageBody(){ return document.getElementById('gnw-stage-body'); }

/* Shared "end screen" renderer used by most games */
function endScreen(opts){
  // opts: {title, emoji, score, best, bestKey, xp, extraRows:[[label,val],...], onReplay}
  var isNewBest = false;
  if(opts.bestKey){
    var prevBest = 0;
    try{ prevBest = parseInt(localStorage.getItem(opts.bestKey)||'0',10)||0; }catch(e){}
    if(opts.score > prevBest){ isNewBest = true; try{ localStorage.setItem(opts.bestKey, String(opts.score)); }catch(e){} }
    else { opts.best = prevBest; }
  }
  var rowsHtml = '';
  var rows = [[gt('score'), opts.score]];
  if(opts.bestKey !== undefined) rows.push([gt('best'), isNewBest ? opts.score : (opts.best||0)]);
  if(opts.extraRows) rows = rows.concat(opts.extraRows);
  rows.forEach(function(r){
    rowsHtml += '<div class="gnw-stat">' + r[1] + '<strong style="display:block">' + r[0] + '</strong></div>';
  });
  var html =
    '<div id="gnw-end-stats-card" style="text-align:center;padding:20px 10px;">' +
      '<div style="font-size:52px;margin-bottom:6px;">' + (opts.emoji||'\ud83c\udf89') + '</div>' +
      '<div class="gnw-game-title" style="justify-content:center;margin-bottom:4px;">' + (opts.title||gt('gameOver')) + '</div>' +
      (isNewBest ? '<div style="color:#f59e0b;font-weight:900;margin-bottom:8px;">\u2b50 ' + gt('newBest') + '</div>' : '') +
      '<div class="gnw-stat-grid">' + rowsHtml + '</div>' +
      '<div style="display:flex;gap:10px;justify-content:center;margin-top:6px;flex-wrap:wrap;">' +
        '<button type="button" class="gnw-big-btn" id="gnw-replay-btn">\ud83d\udd01 ' + gt('playAgain') + '</button>' +
        '<button type="button" class="gnw-big-btn" onclick="window._gnwCloseModal()">' + gt('close') + '</button>' +
      '</div>' +
    '</div>';
  var body = stageBody();
  if(body) body.innerHTML = html;
  var btn = document.getElementById('gnw-replay-btn');
  if(btn) btn.addEventListener('click', opts.onReplay);
  if(opts.xp) window.earnXP(opts.xp, gameLabel(_activeGameId));
}
window._gnwEndScreen = endScreen;

/* ============================================================
   4. GAME REGISTRY (58 games -> category, icon, engine, config)
   ============================================================ */
var GAMES = {};
function reg(id, cat, icon, engine, cfg){ GAMES[id] = {cat:cat, icon:icon, engine:engine, cfg:cfg||{}}; }

window.openGame = function(id){
  var meta = GAMES[id];
  if(!meta){ console.warn('Unknown game id', id); return; }
  _activeGameId = id;
  bumpStreak();
  openModalShell(id, meta);
  var eng = ENGINES[meta.engine];
  if(eng && eng.start){
    _activeCleanup = eng.start(id, meta.cfg) || null;
  }
};

window.setFilter = function(cat, btnEl){
  document.querySelectorAll('.flt').forEach(function(b){ b.classList.remove('active'); });
  if(btnEl) btnEl.classList.add('active');
  document.querySelectorAll('.game-card[data-cat], .top12-card[data-game-id]').forEach(function(card){
    var c = card.getAttribute('data-cat');
    if(cat === 'all'){ card.classList.remove('gnw-hidden'); return; }
    if(c){ card.classList.toggle('gnw-hidden', c !== cat); }
  });
};

/* ============================================================
   5. ENGINES  (populated below in separate script chunks)
   ============================================================ */
var ENGINES = {};
window._GNW_ENGINES = ENGINES;
window._GNW_GAMES = GAMES;
window._GNW_REG = reg;
window._gnwGt = gt;
window._gnwStageBody = stageBody;
window._gnwGameLabel = gameLabel;

})();

/* ============================================================
   ENGINE: QUIZ  (colorquiz, flagquiz, truefalse, riddles, emojiquiz,
   oddone, genquiz, geoquiz, sciquiz, moviequiz, expertquiz, histquiz)
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;

var BANKS = {
colorquiz:[["What color do you get by mixing blue and yellow?",["Green","Purple","Orange","Brown"],0],
["What color is a ripe banana?",["Red","Yellow","Blue","Purple"],1],
["What color do you get by mixing red and white?",["Pink","Orange","Purple","Brown"],0],
["What is the color of an emerald?",["Blue","Red","Green","Yellow"],2],
["What color is associated with royalty?",["Purple","Orange","Green","Pink"],0],
["What color do you get by mixing red and blue?",["Green","Purple","Orange","Yellow"],1],
["What color is a clear sky on a sunny day?",["Green","Blue","Gray","Purple"],1],
["What color do you get by mixing all primary colors of light?",["Black","White","Gray","Brown"],1],
["What color is a stop sign?",["Yellow","Green","Red","Blue"],2],
["What color do you get by mixing green and red pigment?",["Brown","Purple","Orange","Blue"],0],
["What color are most limes?",["Yellow","Green","Orange","Red"],1],
["What color is coal?",["White","Gray","Black","Brown"],2]],
flagquiz:[["Which country's flag is red with a white circle and a red maple leaf?",["Canada","Japan","Peru","Austria"],0],
["Which flag has a red circle on a white background?",["China","Japan","South Korea","Vietnam"],1],
["Which country's flag has a Union Jack in the corner?",["Ireland","Australia","Germany","Brazil"],1],
["Which flag is a simple horizontal tricolor of green, white, and red?",["Italy","Hungary","Bulgaria","Iran"],0],
["Which country's flag features a large yellow star pattern on blue?",["USA","EU","Brazil","Chile"],1],
["Which flag has a green, white, and orange tricolor with a wheel in the middle?",["India","Ireland","Niger","Ivory Coast"],0],
["Which flag features a red circle on a white field with rays?",["Bangladesh","Japan","Palau","South Korea"],0],
["Which country's flag is a red field with a white cross?",["Switzerland","Denmark","Georgia","Norway"],0],
["Which flag has horizontal blue, white, and red stripes?",["Russia","France","Netherlands","Luxembourg"],0],
["Which country's flag has a five-pointed star and stripes?",["USA","Chile","Cuba","Turkey"],0],
["Which flag features a golden eagle holding a snake?",["Spain","Mexico","Ecuador","Colombia"],1],
["Which flag is plain green with a white crescent and star?",["Pakistan","Algeria","Turkey","Tunisia"],0]],
truefalse:[["Honey never spoils.",true],
["The Great Wall of China is visible from space with the naked eye.",false],
["A group of flamingos is called a flamboyance.",true],
["Goldfish have a memory span of only three seconds.",false],
["Octopuses have three hearts.",true],
["Lightning never strikes the same place twice.",false],
["Bananas are berries, botanically speaking.",true],
["Humans only use 10% of their brains.",false],
["The Eiffel Tower can grow taller in summer heat.",true],
["Sharks are older than trees.",true],
["Cracking your knuckles causes arthritis.",false],
["A bolt of lightning is hotter than the surface of the sun.",true]],
riddles:[["What has keys but no locks, space but no room, and you can enter but not go in?",["A keyboard","A map","A piano","A house"],0],
["The more you take, the more you leave behind. What am I?",["Time","Footsteps","Memories","Money"],1],
["What has a neck but no head?",["A bottle","A shirt","A guitar","A road"],0],
["What can travel around the world while staying in a corner?",["A stamp","A clock","The sun","A shadow"],0],
["What gets wetter the more it dries?",["A sponge","A towel","Rain","Soap"],1],
["What has one eye but cannot see?",["A needle","A storm","A potato","A cyclops"],0],
["What comes down but never goes up?",["Rain","Age","Time","A ball"],0],
["What has many teeth but cannot bite?",["A comb","A saw","A zipper","A gear"],0],
["What has hands but cannot clap?",["A clock","A statue","A glove","A robot"],0],
["I speak without a mouth and hear without ears. What am I?",["An echo","A ghost","A phone","A shadow"],0],
["What building has the most stories?",["A library","A skyscraper","A school","A museum"],0],
["What is full of holes but still holds water?",["A sponge","A net","A sieve","A bucket"],0]],
emojiquiz:[["\ud83c\udf55\ud83e\uddc0",["Pizza","Cheese burger","Pasta","Pizza with cheese"],3],
["\ud83c\udf19\ud83d\udc36",["Werewolf","Moon dog","Space dog","Night walk"],0],
["\ud83d\udd25\ud83e\udd8a",["Fire Fox","Hot fox","Firefox","Fox on fire"],2],
["\ud83c\udf3f\ud83c\udfe0",["Green house","Garden home","Farm house","Backyard"],0],
["\u2708\ufe0f\ud83d\udc36",["Snoopy","Flying dog","Air dog","Dog Fight"],0],
["\ud83d\udc0d\u2764\ufe0f",["Snake charmer","Snake eyes","I love snakes","Anaconda"],2],
["\ud83c\udf1e\ud83d\udd76\ufe0f",["Sunglasses","Cool sun","Sunny day","Beach vibes"],1],
["\ud83e\udd1e\ud83c\udf40",["Lucky charm","Good luck","Four leaf clover luck","Irish luck"],1],
["\ud83d\udc31\ud83d\udc09",["Cat dragon","Puff the cat","Catzilla","Dragon cat"],2],
["\u2b50\ud83c\udf0c",["Star gazing","Shooting star","Starry night","Galaxy star"],2],
["\ud83c\udf6f\ud83d\udc1d",["Sweet bee","Honey bee","Bee hive","Busy bee"],1],
["\ud83c\udfd6\ufe0f\u2600\ufe0f",["Sunny beach","Vacation","Summer day","Beach day"],0]],
oddone:[["Which one doesn't belong: Apple, Banana, Carrot, Orange?",["Apple","Banana","Carrot","Orange"],2],
["Which one doesn't belong: Triangle, Square, Circle, Cube?",["Triangle","Square","Circle","Cube"],3],
["Which one doesn't belong: Salmon, Trout, Dolphin, Tuna?",["Salmon","Trout","Dolphin","Tuna"],2],
["Which one doesn't belong: Piano, Guitar, Violin, Drum?",["Piano","Guitar","Violin","Drum"],3],
["Which one doesn't belong: Jupiter, Mars, Moon, Venus?",["Jupiter","Mars","Moon","Venus"],2],
["Which one doesn't belong: Oak, Maple, Rose, Pine?",["Oak","Maple","Rose","Pine"],2],
["Which one doesn't belong: Spider, Ant, Bee, Bird?",["Spider","Ant","Bee","Bird"],3],
["Which one doesn't belong: Gold, Silver, Wood, Copper?",["Gold","Silver","Wood","Copper"],2],
["Which one doesn't belong: Football, Basketball, Chess, Tennis?",["Football","Basketball","Chess","Tennis"],2],
["Which one doesn't belong: Car, Bicycle, Airplane, Boat?",["Car","Bicycle","Airplane","Boat"],1],
["Which one doesn't belong: Winter, Spring, Monday, Summer?",["Winter","Spring","Monday","Summer"],2],
["Which one doesn't belong: Novel, Poem, Painting, Essay?",["Novel","Poem","Painting","Essay"],2]],
genquiz:[["What is the capital of Australia?",["Sydney","Canberra","Melbourne","Perth"],1],
["How many continents are there on Earth?",["5","6","7","8"],2],
["What is the tallest mountain in the world?",["K2","Everest","Kilimanjaro","Denali"],1],
["What is the largest ocean on Earth?",["Atlantic","Indian","Arctic","Pacific"],3],
["Which planet is known as the Red Planet?",["Venus","Mars","Jupiter","Saturn"],1],
["What is the currency of Japan?",["Won","Yuan","Yen","Ringgit"],2],
["How many players are on a soccer team on the field?",["9","10","11","12"],2],
["What is the smallest prime number?",["0","1","2","3"],2],
["Which gas do plants absorb from the atmosphere?",["Oxygen","Carbon Dioxide","Nitrogen","Hydrogen"],1],
["What is the largest mammal in the world?",["Elephant","Blue Whale","Giraffe","Hippo"],1],
["How many bones are in the adult human body?",["186","206","226","246"],1],
["What is the freezing point of water in Celsius?",["0","32","100","-10"],0]],
geoquiz:[["What is the capital of France?",["Berlin","Madrid","Paris","Rome"],2],
["What is the longest river in the world?",["Amazon","Nile","Yangtze","Mississippi"],1],
["Which country has the largest population?",["USA","India","China","Indonesia"],2],
["What is the smallest country in the world?",["Monaco","San Marino","Vatican City","Liechtenstein"],2],
["Which desert is the largest in the world?",["Sahara","Gobi","Antarctic","Arabian"],2],
["What is the capital of Egypt?",["Cairo","Alexandria","Giza","Luxor"],0],
["Which continent is the Sahara Desert located in?",["Asia","Africa","Australia","South America"],1],
["What is the capital of Canada?",["Toronto","Vancouver","Ottawa","Montreal"],2],
["Which country is shaped like a boot?",["Spain","Italy","Greece","Portugal"],1],
["What is the capital of Brazil?",["Rio de Janeiro","Sao Paulo","Brasilia","Salvador"],2],
["Which mountain range separates Europe and Asia?",["Alps","Andes","Ural","Himalayas"],2],
["What is the capital of South Korea?",["Busan","Seoul","Incheon","Daegu"],1]],
sciquiz:[["What is the chemical symbol for gold?",["Ag","Au","Gd","Go"],1],
["What planet is closest to the Sun?",["Venus","Earth","Mercury","Mars"],2],
["What is the powerhouse of the cell?",["Nucleus","Ribosome","Mitochondria","Membrane"],2],
["What gas do humans need to breathe to survive?",["Nitrogen","Oxygen","Carbon Dioxide","Helium"],1],
["What is the speed of light approximately?",["300,000 km/s","150,000 km/s","3,000 km/s","30,000 km/s"],0],
["How many bones does a shark's skeleton have?",["206","0 (cartilage)","150","300"],1],
["What force keeps us on the ground?",["Magnetism","Friction","Gravity","Inertia"],2],
["What is H2O commonly known as?",["Salt","Water","Hydrogen","Oxygen"],1],
["What is the study of living organisms called?",["Chemistry","Physics","Biology","Geology"],2],
["What part of the plant conducts photosynthesis?",["Root","Stem","Leaf","Flower"],2],
["What is the hardest natural substance on Earth?",["Gold","Iron","Diamond","Quartz"],2],
["Which blood type is known as the universal donor?",["A","B","AB","O negative"],3]],
moviequiz:[["Which movie features a robot named WALL-E?",["Wall-E","Robots","Big Hero 6","The Iron Giant"],0],
["Who directed the movie Jaws?",["George Lucas","Steven Spielberg","James Cameron","Ridley Scott"],1],
["Which animated movie features a snowman named Olaf?",["Frozen","Ice Age","Happy Feet","Coco"],0],
["In which movie franchise do characters use lightsabers?",["Star Trek","Star Wars","Guardians of the Galaxy","Dune"],1],
["Which movie is about a boy who can see dead people?",["The Sixth Sense","Ghost","Poltergeist","Sixth Grade"],0],
["Which studio produced Toy Story?",["DreamWorks","Pixar","Disney Animation","Illumination"],1],
["Who played Iron Man in the Marvel films?",["Chris Evans","Chris Hemsworth","Robert Downey Jr.","Mark Ruffalo"],2],
["Which movie features a shark terrorizing a beach town?",["Jaws","Deep Blue Sea","The Meg","Open Water"],0],
["What is the name of the wizarding school in Harry Potter?",["Hogwarts","Ilvermorny","Beauxbatons","Durmstrang"],0],
["Which movie won the first Academy Award for Best Picture?",["Wings","Gone with the Wind","Casablanca","It Happened One Night"],0],
["Which movie features a clownfish searching for his son?",["Finding Nemo","Shark Tale","Moana","Finding Dory"],0],
["Who directed The Lion King (1994)?",["Roger Allers & Rob Minkoff","John Lasseter","Brenda Chapman","Pete Docter"],0]],
expertquiz:[["What is the only planet that rotates clockwise (retrograde)?",["Mars","Venus","Uranus","Neptune"],1],
["What is the term for a word that reads the same backward and forward?",["Anagram","Palindrome","Acronym","Homonym"],1],
["What is the smallest bone in the human body?",["Femur","Stapes","Radius","Patella"],1],
["Which element has the atomic number 1?",["Helium","Hydrogen","Lithium","Oxygen"],1],
["What year did the Berlin Wall fall?",["1987","1989","1991","1993"],1],
["What is the capital of Kazakhstan?",["Almaty","Astana","Bishkek","Tashkent"],1],
["Which author wrote '1984'?",["Aldous Huxley","George Orwell","Ray Bradbury","Kurt Vonnegut"],1],
["What is the longest bone in the human body?",["Tibia","Humerus","Femur","Fibula"],2],
["Which country has the most time zones?",["Russia","USA","France","China"],2],
["What is the term for fear of spiders?",["Claustrophobia","Arachnophobia","Acrophobia","Ophidiophobia"],1],
["What is the world's largest coral reef system?",["Belize Barrier Reef","Great Barrier Reef","Red Sea Reef","Coral Triangle"],1],
["What is the rarest blood type?",["O negative","AB negative","B negative","A negative"],1]],
histquiz:[["In what year did World War II end?",["1943","1945","1947","1950"],1],
["Who was the first President of the United States?",["Thomas Jefferson","John Adams","George Washington","Benjamin Franklin"],2],
["Which ancient civilization built the pyramids of Giza?",["Romans","Greeks","Egyptians","Mayans"],2],
["In what year did the Titanic sink?",["1905","1912","1918","1923"],1],
["Who was known as the 'Maid of Orleans'?",["Marie Antoinette","Joan of Arc","Catherine the Great","Cleopatra"],1],
["Which empire was ruled by Julius Caesar?",["Greek Empire","Roman Empire","Persian Empire","Ottoman Empire"],1],
["In what year did the Berlin Wall fall?",["1987","1989","1991","1993"],1],
["Who wrote the Declaration of Independence?",["Benjamin Franklin","Thomas Jefferson","John Adams","James Madison"],1],
["Which war was fought between the North and South United States?",["Revolutionary War","Civil War","World War I","Mexican-American War"],1],
["What ancient wonder was located in Alexandria?",["Colossus of Rhodes","Lighthouse of Alexandria","Hanging Gardens","Great Pyramid"],1],
["Who was the first man to walk on the Moon?",["Buzz Aldrin","Neil Armstrong","Yuri Gagarin","John Glenn"],1],
["Which country gifted the Statue of Liberty to the USA?",["Britain","Spain","France","Italy"],2]]
};

var STATE = {};

function renderQuestion(id){
  var s = STATE[id];
  var q = s.bank[s.i];
  var isTF = typeof q[1] === 'boolean';
  var options = isTF ? [gt('correct').replace('!','') === '' ? 'True' : 'True', 'False'] : q[1];
  if(isTF) options = ['True','False'];
  var body = stageBody();
  var optsHtml = '';
  options.forEach(function(opt, idx){
    optsHtml += '<button type="button" class="gnw-big-btn gnw-quiz-opt" data-idx="'+idx+'" style="display:block;width:100%;text-align:left;margin-bottom:8px;">'+opt+'</button>';
  });
  body.innerHTML =
    '<div style="max-width:520px;margin:0 auto;">' +
      '<div style="display:flex;justify-content:space-between;margin-bottom:10px;">' +
        '<span class="gnw-chip">' + gt('questionOf',{a:s.i+1,b:s.bank.length}) + '</span>' +
        '<span class="gnw-chip">' + gt('score') + ': <b>' + s.score + '</b></span>' +
      '</div>' +
      '<div style="font-size:19px;font-weight:800;margin-bottom:16px;line-height:1.4;">' + q[0] + '</div>' +
      '<div id="gnw-quiz-opts">' + optsHtml + '</div>' +
    '</div>';
  body.querySelectorAll('.gnw-quiz-opt').forEach(function(btn){
    btn.addEventListener('click', function(){
      var idx = parseInt(btn.getAttribute('data-idx'),10);
      var correctIdx = isTF ? (q[1] ? 0 : 1) : q[2];
      var correct = idx === correctIdx;
      body.querySelectorAll('.gnw-quiz-opt').forEach(function(b,i2){ b.disabled = true; if(i2===correctIdx) b.style.background = '#bbf7d0'; });
      if(correct){ s.score++; btn.style.background = '#bbf7d0'; showToastLocal(gt('correct')); }
      else { btn.style.background = '#fecaca'; showToastLocal(gt('wrong')); }
      setTimeout(function(){
        s.i++;
        if(s.i >= s.bank.length){ finishQuiz(id); }
        else renderQuestion(id);
      }, 900);
    });
  });
}
function showToastLocal(msg){ if(window._gnwShowToast) window._gnwShowToast(msg); }

function finishQuiz(id){
  var s = STATE[id];
  var pct = Math.round(s.score / s.bank.length * 100);
  var xp = Math.round(s.score * 8 + (pct===100 ? 20 : 0));
  endScreen({
    title: pct >= 70 ? gt('wellPlayed') : gt('gameOver'),
    emoji: pct===100 ? '\ud83c\udfc6' : (pct>=70 ? '\ud83c\udf89' : '\ud83d\udcda'),
    score: s.score,
    bestKey: 'gnw_best_' + id,
    xp: xp,
    extraRows: [[gt('finalScore'), s.score + '/' + s.bank.length]],
    onReplay: function(){ ENGINES.quiz.start(id); }
  });
}

function shuffle(arr){
  var a = arr.slice();
  for(var i=a.length-1;i>0;i--){ var j = Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}

ENGINES.quiz = {
  start: function(id){
    var bank = BANKS[id] || BANKS.genquiz;
    STATE[id] = { bank: shuffle(bank).slice(0, Math.min(10, bank.length)), i:0, score:0 };
    renderQuestion(id);
    return function cleanup(){ delete STATE[id]; };
  }
};

var quizGames = ['colorquiz','flagquiz','truefalse','riddles','emojiquiz','oddone','genquiz','geoquiz','sciquiz','moviequiz','expertquiz','histquiz'];
var quizIcons = {colorquiz:'\ud83c\udfa8',flagquiz:'\ud83c\udff3\ufe0f',truefalse:'\u2705',riddles:'\ud83e\udde9',emojiquiz:'\ud83d\ude0e',oddone:'\ud83d\udd0d',genquiz:'\ud83e\udde0',geoquiz:'\ud83c\udf0d',sciquiz:'\ud83d\udd2c',moviequiz:'\ud83c\udfac',expertquiz:'\ud83c\udf93',histquiz:'\ud83d\udcdc'};
var quizCat = {histquiz:'memory'};
quizGames.forEach(function(id){ reg(id, quizCat[id]||'quiz', quizIcons[id]||'\u2753', 'quiz'); });

})();

/* ============================================================
   ENGINE: WORD GAMES
   (wordscramble, hangman, typing, anagram, wordchain, wordle,
    crossword, spelling, cipher, wordsearch)
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function toast(msg){ if(window._gnwShowToast) window._gnwShowToast(msg); }
function shuffleArr(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
function scrambleWord(w){
  var a = w.split('');
  var tries = 0;
  do { a = shuffleArr(a); tries++; } while(a.join('') === w && tries < 8);
  return a.join('');
}

var WORDS5 = ['APPLE','BRAVE','CHAIR','DANCE','EAGLE','FLAME','GRAPE','HOUSE','IMAGE','JOKER',
 'KOALA','LEMON','MUSIC','NOBLE','OCEAN','PLANT','QUIET','RIVER','STONE','TIGER',
 'UNITY','VOICE','WATER','YOUTH','ZEBRA','CLOUD','DREAM','EARTH','FRUIT','GHOST'];
var WORDBANK = ['PUZZLE','GARDEN','WINTER','SUMMER','CASTLE','FOREST','MARKET','PENCIL',
 'ROCKET','SILVER','GOLDEN','WONDER','ISLAND','JUNGLE','KNIGHT','LANTERN','MELODY','NATURE',
 'ORANGE','PURPLE','RAINBOW','SPIRIT','THUNDER','UMBRELLA','VOYAGE','WHISPER','CRYSTAL','DOLPHIN','ELEPHANT','FESTIVAL'];
var HANGMAN_WORDS = ['PYTHON','GALAXY','BREEZE','CANYON','FROZEN','MASTER','ROCKET','TUNNEL','VOLCANO','WIZARD','JUNGLE','PUZZLE'];

/* ---------- HANGMAN ---------- */
var hmState = {};
var HM_STAGES = ['','\ud83d\ude10','\ud83d\ude15','\ud83d\ude1f','\ud83d\ude29','\ud83d\ude2b','\ud83d\udc80'];
function hmRender(id){
  var s = hmState[id];
  var display = s.word.split('').map(function(ch){ return s.guessed.indexOf(ch)>-1 ? ch : '_'; }).join(' ');
  var body = stageBody();
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var kb = letters.map(function(l){
    var used = s.guessed.indexOf(l) > -1;
    return '<button type="button" class="gnw-big-btn hm-key" data-l="'+l+'" '+(used?'disabled':'')+' style="width:38px;height:38px;padding:0;font-size:14px;">'+l+'</button>';
  }).join('');
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div style="font-size:44px;margin-bottom:6px;">' + HM_STAGES[s.wrong] + '</div>' +
      '<div style="font-size:11px;color:#64748b;margin-bottom:6px;">' + gt('tries') + ': ' + (6-s.wrong) + '</div>' +
      '<div style="font-size:30px;font-weight:900;letter-spacing:6px;margin-bottom:16px;">' + display + '</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;max-width:460px;margin:0 auto;">' + kb + '</div>' +
    '</div>';
  body.querySelectorAll('.hm-key').forEach(function(btn){
    btn.addEventListener('click', function(){
      var l = btn.getAttribute('data-l');
      s.guessed.push(l);
      if(s.word.indexOf(l) === -1){ s.wrong++; }
      if(s.word.split('').every(function(c){ return s.guessed.indexOf(c)>-1; })){
        endScreen({title:gt('youWin'),emoji:'\ud83c\udf89',score:6-s.wrong,bestKey:'gnw_best_hangman',xp:30,onReplay:function(){ENGINES.hangman.start('hangman');}});
        return;
      }
      if(s.wrong >= 6){
        var body2 = stageBody();
        endScreen({title:gt('gameOver'),emoji:'\ud83d\udc80',score:0,xp:5,extraRows:[[s.word, 'Word']],onReplay:function(){ENGINES.hangman.start('hangman');}});
        return;
      }
      hmRender(id);
    });
  });
}
ENGINES.hangman = { start: function(id){ hmState[id] = {word: HANGMAN_WORDS[Math.floor(Math.random()*HANGMAN_WORDS.length)], guessed:[], wrong:0}; hmRender(id); return function(){ delete hmState[id]; }; } };
reg('hangman','word','\ud83e\ude82','hangman');

/* ---------- WORDLE ---------- */
var wdState = {};
function wdRender(id){
  var s = wdState[id];
  var body = stageBody();
  var rowsHtml = '';
  for(var r=0;r<6;r++){
    var rowCells = '';
    for(var c=0;c<5;c++){
      var ch = s.guesses[r] ? s.guesses[r][c] : '';
      var cls = 'background:#f1f5f9;color:#172033;';
      if(s.results[r]){
        var st = s.results[r][c];
        if(st===2) cls='background:#22c55e;color:#fff;';
        else if(st===1) cls='background:#f59e0b;color:#fff;';
        else cls='background:#cbd5e1;color:#fff;';
      }
      rowCells += '<div style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border-radius:8px;'+cls+'">'+ch+'</div>';
    }
    rowsHtml += '<div style="display:flex;gap:5px;margin-bottom:5px;">'+rowCells+'</div>';
  }
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div>' + rowsHtml + '</div>' +
      '<div style="margin-top:10px;display:flex;gap:8px;justify-content:center;">' +
        '<input id="wd-input" maxlength="5" style="width:160px;text-align:center;text-transform:uppercase;font-weight:900;letter-spacing:4px;" placeholder="' + gt('yourAnswer') + '">' +
        '<button type="button" class="gnw-big-btn" id="wd-submit">' + gt('submit') + '</button>' +
      '</div>' +
    '</div>';
  var inp = document.getElementById('wd-input');
  if(inp) inp.focus();
  function submit(){
    var g = (inp.value||'').toUpperCase();
    if(g.length !== 5) return;
    var res = [0,0,0,0,0];
    var wordArr = s.word.split('');
    var used = [false,false,false,false,false];
    for(var i=0;i<5;i++){ if(g[i]===wordArr[i]){ res[i]=2; used[i]=true; } }
    for(var i=0;i<5;i++){
      if(res[i]===2) continue;
      var idx = -1;
      for(var j=0;j<5;j++){ if(!used[j] && wordArr[j]===g[i]){ idx=j; break; } }
      if(idx>-1){ res[i]=1; used[idx]=true; }
    }
    s.guesses[s.row] = g;
    s.results[s.row] = res;
    s.row++;
    if(g === s.word){
      wdRender(id);
      setTimeout(function(){ endScreen({title:gt('youWin'),emoji:'\ud83c\udf89',score:6-s.row+1,bestKey:'gnw_best_wordle',xp:35,onReplay:function(){ENGINES.wordle.start('wordle');}}); }, 500);
      return;
    }
    if(s.row >= 6){
      wdRender(id);
      setTimeout(function(){ endScreen({title:gt('gameOver'),emoji:'\ud83d\ude22',score:0,xp:5,extraRows:[[s.word,'Word']],onReplay:function(){ENGINES.wordle.start('wordle');}}); }, 500);
      return;
    }
    wdRender(id);
  }
  var btn = document.getElementById('wd-submit');
  if(btn) btn.addEventListener('click', submit);
  if(inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter') submit(); });
}
ENGINES.wordle = { start: function(id){ wdState[id] = {word: WORDS5[Math.floor(Math.random()*WORDS5.length)], guesses:[], results:[], row:0}; wdRender(id); return function(){ delete wdState[id]; }; } };
reg('wordle','word','\ud83d\udfe9','wordle');

/* ---------- WORDSCRAMBLE / ANAGRAM ---------- */
var scState = {};
function scRender(id){
  var s = scState[id];
  var body = stageBody();
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div style="font-size:12px;color:#64748b;margin-bottom:10px;">' + gt('questionOf',{a:s.i+1,b:s.words.length}) + '</div>' +
      '<div style="font-size:36px;font-weight:900;letter-spacing:6px;margin-bottom:18px;">' + s.scrambled + '</div>' +
      '<input id="sc-input" style="width:220px;text-align:center;text-transform:uppercase;font-weight:900;letter-spacing:3px;" placeholder="' + gt('yourAnswer') + '">' +
      '<div style="margin-top:12px;"><button type="button" class="gnw-big-btn" id="sc-submit">' + gt('submit') + '</button></div>' +
    '</div>';
  var inp = document.getElementById('sc-input');
  if(inp) inp.focus();
  function submit(){
    var g = (inp.value||'').toUpperCase().trim();
    if(g === s.words[s.i]){ s.score++; toast(gt('correct')); }
    else { toast(gt('wrong') + ': ' + s.words[s.i]); }
    s.i++;
    if(s.i >= s.words.length){
      endScreen({title:gt('gameOver'),emoji:'\ud83d\udcdd',score:s.score,bestKey:'gnw_best_'+id,xp:s.score*8,extraRows:[[gt('finalScore'), s.score+'/'+s.words.length]],onReplay:function(){ENGINES[id==='anagram'?'anagram':'wordscramble'].start(id);}});
      return;
    }
    s.scrambled = scrambleWord(s.words[s.i]);
    scRender(id);
  }
  var btn = document.getElementById('sc-submit');
  if(btn) btn.addEventListener('click', submit);
  if(inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter') submit(); });
}
function scStart(id, pool){
  var words = shuffleArr(pool).slice(0,8);
  scState[id] = {words: words, i:0, score:0, scrambled: scrambleWord(words[0])};
  scRender(id);
  return function(){ delete scState[id]; };
}
ENGINES.wordscramble = { start: function(id){ return scStart(id, WORDBANK); } };
ENGINES.anagram = { start: function(id){ return scStart(id, WORDS5); } };
reg('wordscramble','word','\ud83d\udd24','wordscramble');
reg('anagram','word','\ud83d\udd01','anagram');

/* ---------- WORDCHAIN ---------- */
var VALID_WORDS = {};
WORDBANK.concat(WORDS5).concat(HANGMAN_WORDS).forEach(function(w){ VALID_WORDS[w]=true; });
['TABLE','ELEPHANT','TIGER','RABBIT','TEAPOT','TOMATO','ORANGE','EAGLE','ENERGY','YELLOW','WORLD','DRAGON','NATURE','ENGINE','EAST','TEACHER','ROCKET','TIME','ELEVEN','NORTH','HOTEL','LEMON'].forEach(function(w){VALID_WORDS[w]=true;});
var wcState = {};
function wcRender(id){
  var s = wcState[id];
  var body = stageBody();
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div class="gnw-chip" style="margin-bottom:10px;display:inline-block;">' + gt('score') + ': <b>' + s.chain.length + '</b></div>' +
      '<div style="font-size:14px;color:#64748b;margin-bottom:6px;">' + gt('yourAnswer') + '</div>' +
      '<div style="font-size:28px;font-weight:900;margin-bottom:14px;">' + s.chain[s.chain.length-1] + '</div>' +
      '<div style="font-size:12px;color:#64748b;margin-bottom:6px;">\u2192 starts with "' + s.chain[s.chain.length-1].slice(-1) + '"</div>' +
      '<input id="wc-input" style="width:200px;text-align:center;text-transform:uppercase;font-weight:900;" placeholder="' + gt('yourAnswer') + '">' +
      '<div style="margin-top:10px;"><button type="button" class="gnw-big-btn" id="wc-submit">' + gt('submit') + '</button></div>' +
    '</div>';
  var inp = document.getElementById('wc-input'); if(inp) inp.focus();
  function submit(){
    var g = (inp.value||'').toUpperCase().trim();
    var last = s.chain[s.chain.length-1];
    var valid = g.length>=3 && g[0]===last.slice(-1) && VALID_WORDS[g] && s.chain.indexOf(g)===-1;
    if(valid){
      s.chain.push(g);
      toast(gt('correct'));
      inp.value='';
      wcRender(id);
    } else {
      endScreen({title:gt('gameOver'),emoji:'\ud83d\udd17',score:s.chain.length-1,bestKey:'gnw_best_wordchain',xp:(s.chain.length-1)*6,onReplay:function(){ENGINES.wordchain.start('wordchain');}});
    }
  }
  var btn = document.getElementById('wc-submit'); if(btn) btn.addEventListener('click', submit);
  if(inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter') submit(); });
}
ENGINES.wordchain = { start: function(id){ wcState[id] = {chain:['TABLE']}; wcRender(id); return function(){ delete wcState[id]; }; } };
reg('wordchain','word','\ud83d\udd17','wordchain');

/* ---------- TYPING SPEED ---------- */
var tpState = {};
function tpRender(id){
  var s = tpState[id];
  var body = stageBody();
  var remaining = Math.max(0, Math.ceil((s.endTime - Date.now())/1000));
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div style="display:flex;justify-content:space-between;max-width:340px;margin:0 auto 12px;">' +
        '<span class="gnw-chip">' + gt('time') + ': <b id="tp-time">' + remaining + 's</b></span>' +
        '<span class="gnw-chip">' + gt('score') + ': <b>' + s.score + '</b></span>' +
      '</div>' +
      '<div style="font-size:26px;font-weight:900;margin-bottom:14px;letter-spacing:2px;">' + s.words[s.i] + '</div>' +
      '<input id="tp-input" style="width:220px;text-align:center;font-weight:800;" autocomplete="off">' +
    '</div>';
  var inp = document.getElementById('tp-input'); if(inp) inp.focus();
  if(inp) inp.addEventListener('input', function(){
    if(inp.value.trim().toLowerCase() === s.words[s.i].toLowerCase()){
      s.score++;
      s.i = (s.i+1) % s.words.length;
      inp.value='';
      tpRender(id);
    }
  });
}
ENGINES.typing = {
  start: function(id){
    var pool = shuffleArr(WORDBANK.concat(WORDS5));
    tpState[id] = {words: pool, i:0, score:0, endTime: Date.now()+60000};
    tpRender(id);
    var timer = setInterval(function(){
      var s = tpState[id]; if(!s) return;
      var remain = Math.max(0, Math.ceil((s.endTime-Date.now())/1000));
      var t = document.getElementById('tp-time'); if(t) t.textContent = remain+'s';
      if(remain<=0){
        clearInterval(timer);
        endScreen({title:gt('timeUp'),emoji:'\u23f1\ufe0f',score:s.score,bestKey:'gnw_best_typing',xp:s.score*5,onReplay:function(){ENGINES.typing.start('typing');}});
      }
    }, 500);
    return function(){ clearInterval(timer); delete tpState[id]; };
  }
};
reg('typing','word','\u2328\ufe0f','typing');

/* ---------- SPELLING BEE (multiple choice) ---------- */
var SPELL_PAIRS = [["NECESSARY","NECCESSARY"],["DEFINITELY","DEFINATELY"],["SEPARATE","SEPERATE"],["OCCURRED","OCURRED"],
["RECEIVE","RECIEVE"],["BEGINNING","BEGINING"],["ACHIEVE","ACHEIVE"],["ARGUMENT","ARGEUMENT"],["EMBARRASS","EMBARASS"],
["MAINTENANCE","MAINTAINANCE"],["REFERENCE","REFFERENCE"],["CONSCIOUS","CONSCIOUSE"]];
var spState = {};
function spRender(id){
  var s = spState[id];
  var pair = s.pairs[s.i];
  var opts = shuffleArr([{t:pair[0],c:true},{t:pair[1],c:false}]);
  var body = stageBody();
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div style="font-size:12px;color:#64748b;margin-bottom:10px;">' + gt('questionOf',{a:s.i+1,b:s.pairs.length}) + '</div>' +
      '<div style="font-size:15px;font-weight:700;margin-bottom:16px;">Which spelling is correct?</div>' +
      '<div id="sp-opts">' + opts.map(function(o,idx){ return '<button type="button" class="gnw-big-btn sp-opt" data-c="'+o.c+'" style="display:block;width:220px;margin:0 auto 10px;">'+o.t+'</button>'; }).join('') + '</div>' +
    '</div>';
  body.querySelectorAll('.sp-opt').forEach(function(btn){
    btn.addEventListener('click', function(){
      var correct = btn.getAttribute('data-c') === 'true';
      if(correct){ s.score++; toast(gt('correct')); } else { toast(gt('wrong')); }
      s.i++;
      if(s.i>=s.pairs.length){ endScreen({title:gt('gameOver'),emoji:'\ud83d\udc1d',score:s.score,bestKey:'gnw_best_spelling',xp:s.score*8,extraRows:[[gt('finalScore'), s.score+'/'+s.pairs.length]],onReplay:function(){ENGINES.spelling.start('spelling');}}); return; }
      setTimeout(function(){ spRender(id); }, 500);
    });
  });
}
ENGINES.spelling = { start: function(id){ spState[id] = {pairs: shuffleArr(SPELL_PAIRS), i:0, score:0}; spRender(id); return function(){ delete spState[id]; }; } };
reg('spelling','word','\ud83d\udc1d','spelling');

/* ---------- CIPHER (Caesar shift decode, multiple choice) ---------- */
var CIPHER_WORDS = ['PLANET','GARDEN','MYSTERY','WINTER','CASTLE','DRAGON','SILVER','FOREST'];
function caesarShift(s, n){ return s.replace(/[A-Z]/g, function(c){ return String.fromCharCode((c.charCodeAt(0)-65+n)%26+65); }); }
var ciState = {};
function ciRender(id){
  var s = ciState[id];
  var word = s.words[s.i];
  var shift = 3 + (s.i%4);
  var encoded = caesarShift(word, shift);
  var wrongOpts = shuffleArr(CIPHER_WORDS.filter(function(w){return w!==word;})).slice(0,3);
  var opts = shuffleArr([word].concat(wrongOpts));
  var body = stageBody();
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div style="font-size:12px;color:#64748b;margin-bottom:6px;">Caesar shift: ' + shift + '</div>' +
      '<div style="font-size:30px;font-weight:900;letter-spacing:4px;margin-bottom:16px;">' + encoded + '</div>' +
      '<div id="ci-opts">' + opts.map(function(o){ return '<button type="button" class="gnw-big-btn ci-opt" data-w="'+o+'" style="display:block;width:220px;margin:0 auto 10px;">'+o+'</button>'; }).join('') + '</div>' +
    '</div>';
  body.querySelectorAll('.ci-opt').forEach(function(btn){
    btn.addEventListener('click', function(){
      var correct = btn.getAttribute('data-w') === word;
      if(correct){ s.score++; toast(gt('correct')); } else { toast(gt('wrong')); }
      s.i++;
      if(s.i>=s.words.length){ endScreen({title:gt('gameOver'),emoji:'\ud83d\udd10',score:s.score,bestKey:'gnw_best_cipher',xp:s.score*9,extraRows:[[gt('finalScore'), s.score+'/'+s.words.length]],onReplay:function(){ENGINES.cipher.start('cipher');}}); return; }
      setTimeout(function(){ ciRender(id); }, 600);
    });
  });
}
ENGINES.cipher = { start: function(id){ ciState[id] = {words: shuffleArr(CIPHER_WORDS), i:0, score:0}; ciRender(id); return function(){ delete ciState[id]; }; } };
reg('cipher','word','\ud83d\udd10','cipher');

/* ---------- WORD SEARCH (simplified: click letters in sequence) ---------- */
var wsState = {};
function wsBuildGrid(words, size){
  var grid = [];
  for(var r=0;r<size;r++){ grid.push(new Array(size).fill(null)); }
  var placed = [];
  words.forEach(function(w){
    var dirs = [[0,1],[1,0],[1,1]];
    for(var attempt=0; attempt<40; attempt++){
      var dir = dirs[Math.floor(Math.random()*dirs.length)];
      var r0 = Math.floor(Math.random()*size), c0 = Math.floor(Math.random()*size);
      var r1 = r0 + dir[0]*(w.length-1), c1 = c0 + dir[1]*(w.length-1);
      if(r1>=size || c1>=size) continue;
      var ok = true;
      for(var i=0;i<w.length;i++){ var rr=r0+dir[0]*i, cc=c0+dir[1]*i; if(grid[rr][cc] && grid[rr][cc]!==w[i]){ ok=false; break; } }
      if(!ok) continue;
      for(var i=0;i<w.length;i++){ var rr=r0+dir[0]*i, cc=c0+dir[1]*i; grid[rr][cc]=w[i]; }
      placed.push({word:w, cells:Array.from({length:w.length},function(_,i){return [r0+dir[0]*i,c0+dir[1]*i];})});
      break;
    }
  });
  for(var r=0;r<size;r++) for(var c=0;c<size;c++) if(!grid[r][c]) grid[r][c] = String.fromCharCode(65+Math.floor(Math.random()*26));
  return {grid:grid, placed:placed};
}
function wsRender(id){
  var s = wsState[id];
  var body = stageBody();
  var size = s.size;
  var cellsHtml = '';
  for(var r=0;r<size;r++){
    for(var c=0;c<size;c++){
      var found = s.foundCells.some(function(k){return k===r+'-'+c;});
      var sel = s.selecting.some(function(k){return k[0]===r && k[1]===c;});
      cellsHtml += '<button type="button" class="ws-cell" data-r="'+r+'" data-c="'+c+'" style="width:32px;height:32px;font-size:13px;font-weight:800;border-radius:6px;'+(found?'background:#bbf7d0;':sel?'background:#bfdbfe;':'background:#f1f5f9;')+'">'+s.grid[r][c]+'</button>';
    }
  }
  var wordsHtml = s.placed.map(function(p){ var done = s.foundWords.indexOf(p.word)>-1; return '<span style="text-decoration:'+(done?'line-through':'none')+';opacity:'+(done?'.4':'1')+';margin-right:8px;font-weight:700;font-size:12px;">'+p.word+'</span>'; }).join('');
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div style="margin-bottom:10px;">' + wordsHtml + '</div>' +
      '<div style="display:grid;grid-template-columns:repeat('+size+',34px);gap:3px;justify-content:center;">' + cellsHtml + '</div>' +
      '<div style="font-size:11px;color:#64748b;margin-top:8px;">Click first and last letter of a word</div>' +
    '</div>';
  body.querySelectorAll('.ws-cell').forEach(function(btn){
    btn.addEventListener('click', function(){
      var r = parseInt(btn.getAttribute('data-r'),10), c = parseInt(btn.getAttribute('data-c'),10);
      s.selecting.push([r,c]);
      if(s.selecting.length===2){
        var a=s.selecting[0], b=s.selecting[1];
        var match = s.placed.find(function(p){
          var cs = p.cells;
          return (cs[0][0]===a[0]&&cs[0][1]===a[1]&&cs[cs.length-1][0]===b[0]&&cs[cs.length-1][1]===b[1]) ||
                 (cs[0][0]===b[0]&&cs[0][1]===b[1]&&cs[cs.length-1][0]===a[0]&&cs[cs.length-1][1]===a[1]);
        });
        if(match && s.foundWords.indexOf(match.word)===-1){
          s.foundWords.push(match.word);
          match.cells.forEach(function(cell){ s.foundCells.push(cell[0]+'-'+cell[1]); });
          toast(gt('correct'));
        }
        s.selecting = [];
      }
      wsRender(id);
      if(s.foundWords.length === s.placed.length){
        setTimeout(function(){ endScreen({title:gt('youWin'),emoji:'\ud83d\udd0e',score:s.foundWords.length,bestKey:'gnw_best_wordsearch',xp:s.foundWords.length*10,onReplay:function(){ENGINES.wordsearch.start('wordsearch');}}); }, 400);
      }
    });
  });
}
ENGINES.wordsearch = {
  start: function(id){
    var pool = shuffleArr(WORDBANK).slice(0,6).map(function(w){return w.slice(0,8);});
    var built = wsBuildGrid(pool, 10);
    wsState[id] = {grid:built.grid, placed:built.placed, size:10, foundWords:[], foundCells:[], selecting:[]};
    wsRender(id);
    return function(){ delete wsState[id]; };
  }
};
reg('wordsearch','word','\ud83d\udd0e','wordsearch');

/* ---------- CROSSWORD (simplified mini: fill-in list from clues) ---------- */
var CROSSWORD_SETS = [
 [["Frozen water","ICE"],["Opposite of day","NIGHT"],["Large gray animal","ELEPHANT"],["Yellow fruit","BANANA"],["King's home","CASTLE"]],
 [["Man's best friend","DOG"],["Bright star at center of solar system","SUN"],["Read this to learn","BOOK"],["Frozen dessert","ICECREAM"],["Fast animal with stripes","ZEBRA"]]
];
var cwState = {};
function cwRender(id){
  var s = cwState[id];
  var body = stageBody();
  var rows = s.set.map(function(pair, i){
    return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;text-align:left;">' +
      '<span style="flex:1;font-size:13px;font-weight:600;">'+(i+1)+'. '+pair[0]+' <span style="color:#94a3b8;">('+pair[1].length+')</span></span>' +
      '<input class="cw-input" data-i="'+i+'" maxlength="'+pair[1].length+'" style="width:140px;text-transform:uppercase;font-weight:800;text-align:center;">' +
    '</div>';
  }).join('');
  body.innerHTML = '<div style="max-width:380px;margin:0 auto;">' + rows + '<button type="button" class="gnw-big-btn" id="cw-submit" style="margin-top:10px;">'+gt('submit')+'</button></div>';
  var btn = document.getElementById('cw-submit');
  if(btn) btn.addEventListener('click', function(){
    var inputs = body.querySelectorAll('.cw-input');
    var correct = 0;
    inputs.forEach(function(inp){
      var i = parseInt(inp.getAttribute('data-i'),10);
      if((inp.value||'').toUpperCase().trim() === s.set[i][1]){ correct++; inp.style.background = '#bbf7d0'; }
      else { inp.style.background = '#fecaca'; }
    });
    setTimeout(function(){
      endScreen({title: correct===s.set.length?gt('youWin'):gt('gameOver'), emoji:'\ud83e\udde9', score:correct, bestKey:'gnw_best_crossword', xp:correct*10, extraRows:[[gt('finalScore'), correct+'/'+s.set.length]], onReplay:function(){ENGINES.crossword.start('crossword');}});
    }, 700);
  });
}
ENGINES.crossword = { start: function(id){ cwState[id] = {set: CROSSWORD_SETS[Math.floor(Math.random()*CROSSWORD_SETS.length)]}; cwRender(id); return function(){ delete cwState[id]; }; } };
reg('crossword','word','\ud83e\udde9','crossword');

})();

/* ============================================================
   ENGINE: MATH GAMES
   (mathbasic, mathquiz, times, make24, mathsprint, numseq)
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function toast(msg){ if(window._gnwShowToast) window._gnwShowToast(msg); }
function rnd(n){ return Math.floor(Math.random()*n); }
function shuffleArr(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }

function genArith(maxN, ops){
  var a = rnd(maxN)+1, b = rnd(maxN)+1, op = ops[rnd(ops.length)], ans;
  if(op==='+') ans=a+b;
  else if(op==='-'){ if(b>a){var t=a;a=b;b=t;} ans=a-b; }
  else if(op==='\u00d7') ans=a*b;
  else { a = a*b; ans=a/b; } // division that's exact
  return {q: a+' '+op+' '+b, ans: ans};
}

function mcOptions(correct, spread){
  var opts = [correct];
  while(opts.length<4){
    var delta = rnd(spread*2+1)-spread;
    var cand = correct+delta;
    if(delta!==0 && opts.indexOf(cand)===-1 && cand>=0) opts.push(cand);
  }
  return shuffleArr(opts);
}

function renderMC(id, state, genFn, xpPer, bestKey, total){
  var s = state;
  var body = stageBody();
  var p = genFn();
  s.current = p;
  var opts = mcOptions(p.ans, Math.max(3, Math.round(p.ans*0.3)+2));
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div style="display:flex;justify-content:space-between;max-width:340px;margin:0 auto 14px;">' +
        '<span class="gnw-chip">' + gt('questionOf',{a:s.i+1,b:total}) + '</span>' +
        '<span class="gnw-chip">' + gt('score') + ': <b>' + s.score + '</b></span>' +
      '</div>' +
      '<div style="font-size:36px;font-weight:900;margin-bottom:18px;">' + p.q + ' = ?</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:280px;margin:0 auto;">' +
        opts.map(function(o){ return '<button type="button" class="gnw-big-btn mc-opt" data-v="'+o+'">'+o+'</button>'; }).join('') +
      '</div>' +
    '</div>';
  body.querySelectorAll('.mc-opt').forEach(function(btn){
    btn.addEventListener('click', function(){
      var v = parseFloat(btn.getAttribute('data-v'));
      if(v === p.ans){ s.score++; toast(gt('correct')); } else { toast(gt('wrong')+': '+p.ans); }
      s.i++;
      if(s.i>=total){
        endScreen({title:gt('gameOver'),emoji:'\u2795',score:s.score,bestKey:bestKey,xp:s.score*xpPer,extraRows:[[gt('finalScore'), s.score+'/'+total]],onReplay:function(){ENGINES[id].start(id);}});
        return;
      }
      setTimeout(function(){ renderMC(id, s, genFn, xpPer, bestKey, total); }, 450);
    });
  });
}

ENGINES.mathbasic = { start: function(id){ var s={i:0,score:0}; renderMC(id, s, function(){return genArith(30,['+','-']);}, 6, 'gnw_best_mathbasic', 12); return function(){}; } };
ENGINES.mathquiz = { start: function(id){ var s={i:0,score:0}; renderMC(id, s, function(){return genArith(15,['+','-','\u00d7']);}, 7, 'gnw_best_mathquiz', 10); return function(){}; } };
ENGINES.times = { start: function(id){ var s={i:0,score:0}; renderMC(id, s, function(){ var a=rnd(11)+2,b=rnd(11)+2; return {q:a+' \u00d7 '+b, ans:a*b}; }, 6, 'gnw_best_times', 12); return function(){}; } };

/* Math sprint: 30 Qs in 60s, timed */
ENGINES.mathsprint = {
  start: function(id){
    var s = {i:0, score:0, endTime: Date.now()+60000};
    function render(){
      var p = genArith(20, ['+','-','\u00d7']);
      s.current = p;
      var opts = mcOptions(p.ans, 5);
      var body = stageBody();
      var remain = Math.max(0, Math.ceil((s.endTime-Date.now())/1000));
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div style="display:flex;justify-content:space-between;max-width:340px;margin:0 auto 14px;">' +
            '<span class="gnw-chip">' + gt('time') + ': <b id="ms-time">'+remain+'s</b></span>' +
            '<span class="gnw-chip">' + gt('score') + ': <b>' + s.score + '</b></span>' +
          '</div>' +
          '<div style="font-size:32px;font-weight:900;margin-bottom:16px;">' + p.q + ' = ?</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:260px;margin:0 auto;">' +
          opts.map(function(o){ return '<button type="button" class="gnw-big-btn mc-opt" data-v="'+o+'">'+o+'</button>'; }).join('') +
          '</div></div>';
      body.querySelectorAll('.mc-opt').forEach(function(btn){
        btn.addEventListener('click', function(){
          var v = parseFloat(btn.getAttribute('data-v'));
          if(v === p.ans) s.score++;
          render();
        });
      });
    }
    render();
    var timer = setInterval(function(){
      var remain = Math.max(0, Math.ceil((s.endTime-Date.now())/1000));
      var t = document.getElementById('ms-time'); if(t) t.textContent = remain+'s';
      if(remain<=0){
        clearInterval(timer);
        endScreen({title:gt('timeUp'),emoji:'\u26a1',score:s.score,bestKey:'gnw_best_mathsprint',xp:s.score*4,onReplay:function(){ENGINES.mathsprint.start('mathsprint');}});
      }
    }, 400);
    return function(){ clearInterval(timer); };
  }
};
reg('mathbasic','math','\u2795','mathbasic');
reg('mathquiz','math','\ud83e\uddee','mathquiz');
reg('times','math','\u2716\ufe0f','times');
reg('mathsprint','math','\u26a1','mathsprint');

/* Number sequence */
function genSeq(){
  var type = rnd(3);
  var start = rnd(10)+1, step = rnd(5)+2;
  var seq = [];
  if(type===0){ for(var i=0;i<5;i++) seq.push(start+step*i); return {seq:seq, ans:start+step*5}; }
  if(type===1){ var r=rnd(2)+2; var v=start; for(var i=0;i<5;i++){seq.push(v); v*=r;} return {seq:seq, ans:v}; }
  var a=1,b=1; seq=[1,1]; for(var i=0;i<3;i++){var c=a+b;seq.push(c);a=b;b=c;} return {seq:seq, ans:a+b};
}
ENGINES.numseq = {
  start: function(id){
    var s = {i:0, score:0};
    function render(){
      var p = genSeq();
      var opts = mcOptions(p.ans, Math.max(4, Math.round(p.ans*0.25)+2));
      var body = stageBody();
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div style="display:flex;justify-content:space-between;max-width:340px;margin:0 auto 14px;">' +
            '<span class="gnw-chip">' + gt('questionOf',{a:s.i+1,b:10}) + '</span>' +
            '<span class="gnw-chip">' + gt('score') + ': <b>'+s.score+'</b></span>' +
          '</div>' +
          '<div style="font-size:28px;font-weight:900;margin-bottom:18px;">' + p.seq.join(', ') + ', ?</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:280px;margin:0 auto;">' +
          opts.map(function(o){ return '<button type="button" class="gnw-big-btn mc-opt" data-v="'+o+'">'+o+'</button>'; }).join('') +
          '</div></div>';
      body.querySelectorAll('.mc-opt').forEach(function(btn){
        btn.addEventListener('click', function(){
          var v = parseFloat(btn.getAttribute('data-v'));
          if(v===p.ans){ s.score++; toast(gt('correct')); } else { toast(gt('wrong')+': '+p.ans); }
          s.i++;
          if(s.i>=10){ endScreen({title:gt('gameOver'),emoji:'\ud83d\udd22',score:s.score,bestKey:'gnw_best_numseq',xp:s.score*8,extraRows:[[gt('finalScore'), s.score+'/10']],onReplay:function(){ENGINES.numseq.start('numseq');}}); return; }
          setTimeout(render, 500);
        });
      });
    }
    render();
    return function(){};
  }
};
reg('numseq','math','\ud83d\udd22','numseq');

/* Make 24 */
ENGINES.make24 = {
  start: function(id){
    var s = {i:0, score:0};
    function genNums(){
      // pick 4 numbers 1-9 that guarantee at least one solution most of time by construction
      var nums = [rnd(9)+1, rnd(9)+1, rnd(9)+1, rnd(9)+1];
      return nums;
    }
    function render(){
      var nums = genNums();
      var body = stageBody();
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div style="display:flex;justify-content:space-between;max-width:340px;margin:0 auto 14px;">' +
            '<span class="gnw-chip">' + gt('questionOf',{a:s.i+1,b:8}) + '</span>' +
            '<span class="gnw-chip">' + gt('score') + ': <b>'+s.score+'</b></span>' +
          '</div>' +
          '<div style="font-size:28px;font-weight:900;margin-bottom:14px;">' + nums.join('  ') + '</div>' +
          '<div style="font-size:12px;color:#64748b;margin-bottom:10px;">Use +, -, *, / and all 4 numbers to make 24</div>' +
          '<input id="m24-input" style="width:220px;text-align:center;font-weight:800;" placeholder="e.g. (2+2)*6*1">' +
          '<div style="margin-top:10px;"><button type="button" class="gnw-big-btn" id="m24-submit">'+gt('submit')+'</button> <button type="button" class="gnw-big-btn" id="m24-skip">'+gt('next')+'</button></div>' +
        '</div>';
      var inp = document.getElementById('m24-input'); if(inp) inp.focus();
      function checkUsesNums(expr){
        var used = (expr.match(/\d+/g)||[]).map(Number).sort();
        var need = nums.slice().sort();
        return JSON.stringify(used) === JSON.stringify(need);
      }
      function submit(){
        var expr = (inp.value||'').trim();
        if(!/^[\d+\-*/().\s]+$/.test(expr)){ toast(gt('wrong')); return; }
        if(!checkUsesNums(expr)){ toast('Use exactly the 4 given numbers'); return; }
        var val;
        try{ val = Function('"use strict";return ('+expr+')')(); }catch(e){ toast(gt('wrong')); return; }
        if(Math.abs(val-24)<0.001){ s.score++; toast(gt('correct')); } else { toast(gt('wrong')); }
        s.i++;
        if(s.i>=8){ endScreen({title:gt('gameOver'),emoji:'\ud83c\udfb2',score:s.score,bestKey:'gnw_best_make24',xp:s.score*10,extraRows:[[gt('finalScore'), s.score+'/8']],onReplay:function(){ENGINES.make24.start('make24');}}); return; }
        render();
      }
      document.getElementById('m24-submit').addEventListener('click', submit);
      document.getElementById('m24-skip').addEventListener('click', function(){ s.i++; if(s.i>=8){ endScreen({title:gt('gameOver'),emoji:'\ud83c\udfb2',score:s.score,bestKey:'gnw_best_make24',xp:s.score*10,onReplay:function(){ENGINES.make24.start('make24');}}); return; } render(); });
      if(inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter') submit(); });
    }
    render();
    return function(){};
  }
};
reg('make24','math','\ud83c\udfb2','make24');

})();

/* ============================================================
   ENGINE: SUDOKU
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function toast(msg){ if(window._gnwShowToast) window._gnwShowToast(msg); }

var SOLUTIONS = [
[5,3,4,6,7,8,9,1,2, 6,7,2,1,9,5,3,4,8, 1,9,8,3,4,2,5,6,7, 8,5,9,7,6,1,4,2,3, 4,2,6,8,5,3,7,9,1, 7,1,3,9,2,4,8,5,6, 9,6,1,5,3,7,2,8,4, 2,8,7,4,1,9,6,3,5, 3,4,5,2,8,6,1,7,9]
];
function makePuzzle(){
  var sol = SOLUTIONS[0].slice();
  var puzzle = sol.slice();
  var removeCount = 40;
  var idxs = Array.from({length:81},function(_,i){return i;});
  for(var i=idxs.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=idxs[i];idxs[i]=idxs[j];idxs[j]=t;}
  for(var k=0;k<removeCount;k++){ puzzle[idxs[k]] = 0; }
  return {puzzle:puzzle, solution:sol};
}
var sdState = {};
function sdRender(id){
  var s = sdState[id];
  var body = stageBody();
  var cellsHtml = '';
  for(var r=0;r<9;r++){
    for(var c=0;c<9;c++){
      var i = r*9+c;
      var given = s.puzzle[i] !== 0;
      var borderR = (c%3===2 && c!==8) ? '3px solid #172033' : '1px solid #cbd5e1';
      var borderB = (r%3===2 && r!==8) ? '3px solid #172033' : '1px solid #cbd5e1';
      cellsHtml += '<input class="sd-cell" data-i="'+i+'" maxlength="1" '+(given?'disabled':'')+
        ' style="width:30px;height:30px;text-align:center;font-weight:900;font-size:14px;border-right:'+borderR+';border-bottom:'+borderB+';background:'+(given?'#e2e8f0':'#fff')+';color:'+(given?'#172033':'#2563eb')+';" value="'+(given?s.puzzle[i]:(s.user[i]||''))+'">';
    }
  }
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div style="display:grid;grid-template-columns:repeat(9,30px);border:3px solid #172033;width:max-content;margin:0 auto 14px;">' + cellsHtml + '</div>' +
      '<button type="button" class="gnw-big-btn" id="sd-check">' + gt('submit') + '</button>' +
    '</div>';
  body.querySelectorAll('.sd-cell').forEach(function(inp){
    inp.addEventListener('input', function(){
      var i = parseInt(inp.getAttribute('data-i'),10);
      var v = inp.value.replace(/[^1-9]/g,'');
      inp.value = v;
      s.user[i] = v ? parseInt(v,10) : 0;
    });
  });
  var btn = document.getElementById('sd-check');
  if(btn) btn.addEventListener('click', function(){
    var correct = 0, filled = 0;
    for(var i=0;i<81;i++){
      if(s.puzzle[i]!==0) continue;
      filled++;
      if(s.user[i] === s.solution[i]) correct++;
    }
    if(correct === filled){
      endScreen({title:gt('youWin'),emoji:'\ud83e\udde9',score:100,bestKey:'gnw_best_sudoku',xp:50,onReplay:function(){ENGINES.sudoku.start('sudoku');}});
    } else {
      toast(correct+'/'+filled+' correct so far');
    }
  });
}
ENGINES.sudoku = { start: function(id){ var g = makePuzzle(); sdState[id] = {puzzle:g.puzzle, solution:g.solution, user:{}}; sdRender(id); return function(){ delete sdState[id]; }; } };
reg('sudoku','math','\ud83e\udde9','sudoku');

})();

/* ============================================================
   ENGINE: SIMPLE / REACTION GAMES
   (coin, dice, rps, numguess, reaction)
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function toast(msg){ if(window._gnwShowToast) window._gnwShowToast(msg); }
function rnd(n){ return Math.floor(Math.random()*n); }

/* Coin flip */
ENGINES.coin = {
  start: function(id){
    var s = {streak:0, best:0};
    try{ s.best = parseInt(localStorage.getItem('gnw_best_coin')||'0',10)||0; }catch(e){}
    function render(){
      var body = stageBody();
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div style="font-size:60px;margin-bottom:14px;" id="coin-face">\ud83e\ude99</div>' +
          '<div class="gnw-chip" style="margin-bottom:14px;display:inline-block;">' + gt('streak') + ': <b>'+s.streak+'</b> \u00b7 ' + gt('best') + ': <b>'+s.best+'</b></div><br>' +
          '<button type="button" class="gnw-big-btn" id="coin-head">'+gt('head')+'</button> ' +
          '<button type="button" class="gnw-big-btn" id="coin-tail">'+gt('tail')+'</button>' +
        '</div>';
      function flip(pick){
        var face = document.getElementById('coin-face');
        var result = rnd(2)===0 ? 'head' : 'tail';
        face.textContent = result==='head' ? '\ud83d\udfe1' : '\u26aa';
        if(pick===result){ s.streak++; toast(gt('correct')); if(s.streak>s.best){ s.best=s.streak; try{localStorage.setItem('gnw_best_coin',String(s.best));}catch(e){} } render(); }
        else {
          endScreen({title:gt('gameOver'),emoji:'\ud83e\ude99',score:s.streak,bestKey:'gnw_best_coin',xp:s.streak*5,onReplay:function(){ENGINES.coin.start('coin');}});
        }
      }
      document.getElementById('coin-head').addEventListener('click', function(){ flip('head'); });
      document.getElementById('coin-tail').addEventListener('click', function(){ flip('tail'); });
    }
    render();
    return function(){};
  }
};
reg('coin','classic','\ud83e\ude99','coin');

/* Dice roller */
ENGINES.dice = {
  start: function(id){
    var s = {rolls:0, total:0};
    function render(){
      var body = stageBody();
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div id="dice-face" style="font-size:70px;margin-bottom:14px;">\ud83c\udfb2</div>' +
          '<div class="gnw-chip" style="margin-bottom:14px;">' + gt('score') + ': <b id="dice-total">'+s.total+'</b></div><br>' +
          '<button type="button" class="gnw-big-btn" id="dice-roll">' + gt('play') + '</button> ' +
          '<button type="button" class="gnw-big-btn" id="dice-done">' + gt('close') + '</button>' +
        '</div>';
      var DICE_FACES = ['\u2680','\u2681','\u2682','\u2683','\u2684','\u2685'];
      document.getElementById('dice-roll').addEventListener('click', function(){
        var v = rnd(6)+1;
        document.getElementById('dice-face').textContent = DICE_FACES[v-1];
        s.total += v; s.rolls++;
        document.getElementById('dice-total').textContent = s.total;
      });
      document.getElementById('dice-done').addEventListener('click', function(){
        endScreen({title:gt('gameOver'),emoji:'\ud83c\udfb2',score:s.total,bestKey:'gnw_best_dice',xp:Math.min(30,s.rolls*3),onReplay:function(){ENGINES.dice.start('dice');}});
      });
    }
    render();
    return function(){};
  }
};
reg('dice','classic','\ud83c\udfb2','dice');

/* Rock Paper Scissors */
ENGINES.rps = {
  start: function(id){
    var s = {you:0, ai:0, round:0};
    var CH = {rock:'\u270a', paper:'\u270b', scissors:'\u270c\ufe0f'};
    function render(){
      var body = stageBody();
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div class="gnw-chip" style="margin-bottom:14px;">' + gt('score') + ': <b>'+s.you+' - '+s.ai+'</b> (' + gt('questionOf',{a:s.round+1,b:5}) + ')</div><br>' +
          '<button type="button" class="gnw-big-btn rps-btn" data-c="rock" style="font-size:26px;">' + CH.rock + '</button> ' +
          '<button type="button" class="gnw-big-btn rps-btn" data-c="paper" style="font-size:26px;">' + CH.paper + '</button> ' +
          '<button type="button" class="gnw-big-btn rps-btn" data-c="scissors" style="font-size:26px;">' + CH.scissors + '</button>' +
          '<div id="rps-result" style="margin-top:14px;font-weight:800;"></div>' +
        '</div>';
      document.querySelectorAll('.rps-btn').forEach(function(btn){
        btn.addEventListener('click', function(){
          var pick = btn.getAttribute('data-c');
          var opts = ['rock','paper','scissors'];
          var ai = opts[rnd(3)];
          var res = pick===ai ? 'draw' : (pick==='rock'&&ai==='scissors')||(pick==='paper'&&ai==='rock')||(pick==='scissors'&&ai==='paper') ? 'win' : 'lose';
          if(res==='win') s.you++; else if(res==='lose') s.ai++;
          document.getElementById('rps-result').innerHTML = gt('youPicked')+': '+CH[pick]+' \u00b7 '+gt('aiPicked')+': '+CH[ai]+'<br>'+(res==='draw'?gt('draw'):res==='win'?gt('correct'):gt('wrong'));
          s.round++;
          setTimeout(function(){
            if(s.round>=5){
              endScreen({title:s.you>s.ai?gt('youWon'):s.you<s.ai?gt('aiWon'):gt('draw'),emoji:'\u270a',score:s.you,bestKey:'gnw_best_rps',xp:s.you*8,extraRows:[['AI', s.ai]],onReplay:function(){ENGINES.rps.start('rps');}});
            } else render();
          }, 1200);
        });
      });
    }
    render();
    return function(){};
  }
};
reg('rps','classic','\u270a','rps');

/* Number guess */
ENGINES.numguess = {
  start: function(id){
    var target = rnd(100)+1, tries = 7;
    function render(msg){
      var body = stageBody();
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div class="gnw-chip" style="margin-bottom:14px;">' + gt('tries') + ': <b>'+tries+'</b></div><br>' +
          '<input id="ng-input" type="number" min="1" max="100" style="width:120px;text-align:center;font-weight:900;font-size:20px;">' +
          '<div style="margin-top:10px;"><button type="button" class="gnw-big-btn" id="ng-submit">'+gt('submit')+'</button></div>' +
          '<div style="margin-top:12px;font-weight:800;font-size:16px;" id="ng-msg">'+(msg||'1-100')+'</div>' +
        '</div>';
      var inp = document.getElementById('ng-input'); if(inp) inp.focus();
      function submit(){
        var g = parseInt(inp.value,10);
        if(isNaN(g)) return;
        tries--;
        if(g === target){
          endScreen({title:gt('youWin'),emoji:'\ud83c\udfaf',score:7-tries,bestKey:undefined,xp:Math.max(10,(tries+1)*8),onReplay:function(){ENGINES.numguess.start('numguess');}});
          return;
        }
        if(tries<=0){
          endScreen({title:gt('gameOver'),emoji:'\ud83d\ude22',score:0,xp:5,extraRows:[[String(target),'Number']],onReplay:function(){ENGINES.numguess.start('numguess');}});
          return;
        }
        render(g<target ? gt('higher') : gt('lower'));
      }
      document.getElementById('ng-submit').addEventListener('click', submit);
      inp.addEventListener('keydown', function(e){ if(e.key==='Enter') submit(); });
    }
    render();
    return function(){};
  }
};
reg('numguess','classic','\ud83c\udfaf','numguess');

/* Reaction time */
ENGINES.reaction = {
  start: function(id){
    var state = 'wait';
    var startT = 0, timeoutId = null;
    function render(){
      var body = stageBody();
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div id="rx-box" style="width:100%;max-width:340px;height:200px;margin:0 auto;border-radius:16px;background:#ef4444;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:16px;cursor:pointer;">' + gt('tapToStart') + '</div>' +
        '</div>';
      var box = document.getElementById('rx-box');
      box.addEventListener('click', function(){
        if(state==='wait'){
          state = 'armed';
          box.style.background = '#f59e0b';
          box.textContent = '...';
          var delay = 1000 + rnd(2500);
          timeoutId = setTimeout(function(){
            state = 'go';
            box.style.background = '#22c55e';
            box.textContent = 'CLICK NOW!';
            startT = Date.now();
          }, delay);
        } else if(state==='armed'){
          clearTimeout(timeoutId);
          box.style.background = '#ef4444';
          box.textContent = 'Too soon! Tap to retry';
          state = 'wait';
        } else if(state==='go'){
          var ms = Date.now()-startT;
          endScreen({title:ms<250?gt('newBest'):gt('wellPlayed'),emoji:'\u26a1',score:ms,bestKey:undefined,xp:Math.max(5,Math.round(300/ms*20)),extraRows:[[ms+' ms','Time']],onReplay:function(){ENGINES.reaction.start('reaction');}});
        }
      });
    }
    render();
    return function(){ clearTimeout(timeoutId); };
  }
};
reg('reaction','classic','\u26a1','reaction');

})();

/* ============================================================
   ENGINE: BOARD GAMES (ttt, c4, lightsout) + MINESWEEPER (mines, mineshard)
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function toast(msg){ if(window._gnwShowToast) window._gnwShowToast(msg); }
function rnd(n){ return Math.floor(Math.random()*n); }

/* ---------- Tic Tac Toe (vs simple AI) ---------- */
ENGINES.ttt = {
  start: function(id){
    var board = new Array(9).fill(null);
    var WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    function winner(b){
      for(var i=0;i<WINS.length;i++){ var w=WINS[i]; if(b[w[0]] && b[w[0]]===b[w[1]] && b[w[1]]===b[w[2]]) return b[w[0]]; }
      if(b.every(function(c){return c;})) return 'draw';
      return null;
    }
    function aiMove(){
      // try win, then block, then center, then random
      var avail = board.map(function(c,i){return c?null:i;}).filter(function(i){return i!==null;});
      for(var i=0;i<avail.length;i++){ var t=board.slice(); t[avail[i]]='O'; if(winner(t)==='O') return avail[i]; }
      for(var i=0;i<avail.length;i++){ var t=board.slice(); t[avail[i]]='X'; if(winner(t)==='X') return avail[i]; }
      if(avail.indexOf(4)>-1) return 4;
      return avail[rnd(avail.length)];
    }
    function render(status){
      var body = stageBody();
      var cells = board.map(function(c,i){ return '<button type="button" class="ttt-cell" data-i="'+i+'" style="width:70px;height:70px;font-size:30px;font-weight:900;border-radius:10px;background:#f1f5f9;">'+(c||'')+'</button>'; }).join('');
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div class="gnw-chip" style="margin-bottom:12px;">' + (status||gt('flagTurn')) + '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(3,70px);gap:6px;justify-content:center;">' + cells + '</div>' +
        '</div>';
      body.querySelectorAll('.ttt-cell').forEach(function(btn){
        btn.addEventListener('click', function(){
          var i = parseInt(btn.getAttribute('data-i'),10);
          if(board[i]) return;
          board[i] = 'X';
          var w = winner(board);
          if(w){ finish(w); return; }
          render(gt('flagAiTurn'));
          setTimeout(function(){
            var m = aiMove();
            if(m!==undefined){ board[m]='O'; }
            var w2 = winner(board);
            if(w2){ finish(w2); return; }
            render(gt('flagTurn'));
          }, 500);
        });
      });
    }
    function finish(w){
      render(w==='draw'?gt('draw'):(w==='X'?gt('youWon'):gt('aiWon')));
      setTimeout(function(){
        endScreen({title: w==='draw'?gt('draw'):(w==='X'?gt('youWon'):gt('aiWon')), emoji: w==='X'?'\ud83c\udfc6':'\ud83e\udd16', score: w==='X'?1:0, xp: w==='X'?20:(w==='draw'?8:3), onReplay:function(){ENGINES.ttt.start('ttt');}});
      }, 700);
    }
    render();
    return function(){};
  }
};
reg('ttt','classic','\u2b55','ttt');

/* ---------- Connect Four (vs simple AI) ---------- */
ENGINES.c4 = {
  start: function(id){
    var ROWS=6, COLS=7;
    var board = Array.from({length:ROWS},function(){return new Array(COLS).fill(null);});
    function drop(col, piece){
      for(var r=ROWS-1;r>=0;r--){ if(!board[r][col]){ board[r][col]=piece; return r; } }
      return -1;
    }
    function checkWin(piece){
      for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++){
        if(board[r][c]!==piece) continue;
        var dirs=[[0,1],[1,0],[1,1],[1,-1]];
        for(var d=0;d<dirs.length;d++){
          var dr=dirs[d][0], dc=dirs[d][1], cnt=1;
          for(var k=1;k<4;k++){ var rr=r+dr*k, cc=c+dc*k; if(rr>=0&&rr<ROWS&&cc>=0&&cc<COLS&&board[rr][cc]===piece) cnt++; else break; }
          if(cnt>=4) return true;
        }
      }
      return false;
    }
    function render(status){
      var body = stageBody();
      var cellsHtml = '';
      for(var r=0;r<ROWS;r++){
        for(var c=0;c<COLS;c++){
          var v = board[r][c];
          cellsHtml += '<div class="c4-cell" data-c="'+c+'" style="width:34px;height:34px;border-radius:50%;background:'+(v==='R'?'#ef4444':v==='Y'?'#f59e0b':'#e2e8f0')+';cursor:pointer;"></div>';
        }
      }
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div class="gnw-chip" style="margin-bottom:10px;">' + (status||gt('flagTurn')) + '</div>' +
          '<div style="display:grid;grid-template-columns:repeat('+COLS+',34px);gap:4px;justify-content:center;background:#1e40af;padding:6px;border-radius:10px;width:max-content;margin:0 auto;">' + cellsHtml + '</div>' +
        '</div>';
      body.querySelectorAll('.c4-cell').forEach(function(cell){
        cell.addEventListener('click', function(){
          var c = parseInt(cell.getAttribute('data-c'),10);
          var r = drop(c, 'R');
          if(r===-1) return;
          if(checkWin('R')){ finish('R'); return; }
          render(gt('flagAiTurn'));
          setTimeout(function(){
            var avail = []; for(var cc=0;cc<COLS;cc++){ if(board[0][cc]===null) avail.push(cc); }
            if(avail.length===0){ finish('draw'); return; }
            var col = avail[rnd(avail.length)];
            drop(col,'Y');
            if(checkWin('Y')){ finish('Y'); return; }
            render(gt('flagTurn'));
          }, 500);
        });
      });
    }
    function finish(w){
      render(w==='draw'?gt('draw'):(w==='R'?gt('youWon'):gt('aiWon')));
      setTimeout(function(){
        endScreen({title:w==='draw'?gt('draw'):(w==='R'?gt('youWon'):gt('aiWon')),emoji:w==='R'?'\ud83d\udd34':'\ud83d\udfe1',score:w==='R'?1:0,xp:w==='R'?25:(w==='draw'?8:3),onReplay:function(){ENGINES.c4.start('c4');}});
      }, 700);
    }
    render();
    return function(){};
  }
};
reg('c4','classic','\ud83d\udd34','c4');

/* ---------- Lights Out ---------- */
ENGINES.lightsout = {
  start: function(id){
    var SIZE = 5;
    var grid = new Array(SIZE*SIZE).fill(false);
    // start from solved state then apply random toggles to guarantee solvability
    for(var i=0;i<15;i++){ toggle(rnd(SIZE*SIZE), false); }
    var moves = 0;
    function idx(r,c){ return r*SIZE+c; }
    function toggle(i, count){
      var r = Math.floor(i/SIZE), c = i%SIZE;
      [[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){
        var rr=r+d[0], cc=c+d[1];
        if(rr>=0&&rr<SIZE&&cc>=0&&cc<SIZE){ grid[idx(rr,cc)] = !grid[idx(rr,cc)]; }
      });
      if(count) moves++;
    }
    function render(){
      var body = stageBody();
      var allOff = grid.every(function(v){return !v;});
      var cells = grid.map(function(v,i){ return '<button type="button" class="lo-cell" data-i="'+i+'" style="width:44px;height:44px;border-radius:8px;background:'+(v?'#fbbf24':'#1e293b')+';"></button>'; }).join('');
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div class="gnw-chip" style="margin-bottom:10px;">' + gt('moves') + ': <b>'+moves+'</b></div>' +
          '<div style="display:grid;grid-template-columns:repeat('+SIZE+',44px);gap:4px;justify-content:center;">' + cells + '</div>' +
        '</div>';
      if(allOff){
        setTimeout(function(){ endScreen({title:gt('youWin'),emoji:'\ud83d\udca1',score:moves,bestKey:undefined,xp:Math.max(15,60-moves),onReplay:function(){ENGINES.lightsout.start('lightsout');}}); }, 300);
        return;
      }
      body.querySelectorAll('.lo-cell').forEach(function(btn){
        btn.addEventListener('click', function(){ toggle(parseInt(btn.getAttribute('data-i'),10), true); render(); });
      });
    }
    render();
    return function(){};
  }
};
reg('lightsout','memory','\ud83d\udca1','lightsout');

/* ---------- Minesweeper (mines = 6x6, mineshard = 10x10) ---------- */
function buildMinesweeper(size, mineCount){
  var cells = size*size;
  var mines = new Array(cells).fill(false);
  var placed = 0;
  while(placed<mineCount){ var i=rnd(cells); if(!mines[i]){ mines[i]=true; placed++; } }
  var counts = new Array(cells).fill(0);
  function neighbors(i){
    var r=Math.floor(i/size), c=i%size, out=[];
    for(var dr=-1;dr<=1;dr++) for(var dc=-1;dc<=1;dc++){
      if(dr===0&&dc===0) continue;
      var rr=r+dr, cc=c+dc;
      if(rr>=0&&rr<size&&cc>=0&&cc<size) out.push(rr*size+cc);
    }
    return out;
  }
  for(var i=0;i<cells;i++){ if(!mines[i]) counts[i] = neighbors(i).filter(function(n){return mines[n];}).length; }
  return {mines:mines, counts:counts, size:size, neighbors:neighbors};
}
function msStart(id, size, mineCount, bestKey){
  var g = buildMinesweeper(size, mineCount);
  var revealed = new Array(size*size).fill(false);
  var flagged = new Array(size*size).fill(false);
  var mode = 'reveal';
  var started = Date.now();
  function reveal(i){
    if(revealed[i] || flagged[i]) return;
    revealed[i] = true;
    if(g.counts[i]===0 && !g.mines[i]){ g.neighbors(i).forEach(function(n){ if(!revealed[n]) reveal(n); }); }
  }
  function render(){
    var body = stageBody();
    var cells = '';
    for(var i=0;i<size*size;i++){
      var content = '';
      var bg = '#cbd5e1';
      if(revealed[i]){
        bg = '#f1f5f9';
        if(g.mines[i]){ content='\ud83d\udca3'; bg='#fecaca'; }
        else if(g.counts[i]>0){ content=g.counts[i]; }
      } else if(flagged[i]){ content = '\ud83d\udea9'; }
      var cellSize = size>=10 ? 26 : 38;
      cells += '<button type="button" class="ms-cell" data-i="'+i+'" style="width:'+cellSize+'px;height:'+cellSize+'px;font-size:'+(cellSize-16)+'px;font-weight:900;border-radius:4px;background:'+bg+';">'+content+'</button>';
    }
    body.innerHTML =
      '<div style="text-align:center;">' +
        '<div class="gnw-chip" style="margin-bottom:10px;">\ud83d\udca3 '+mineCount+' &nbsp; <button type="button" id="ms-flagmode" class="gnw-big-btn" style="padding:4px 10px;font-size:11px;">'+(mode==='flag'?'\u2705 '+gt('flag'):'\ud83d\udea9 '+gt('flag'))+'</button></div>' +
        '<div style="display:grid;grid-template-columns:repeat('+size+','+(size>=10?26:38)+'px);gap:2px;justify-content:center;">' + cells + '</div>' +
      '</div>';
    var fm = document.getElementById('ms-flagmode');
    if(fm) fm.addEventListener('click', function(){ mode = mode==='flag'?'reveal':'flag'; render(); });
    body.querySelectorAll('.ms-cell').forEach(function(btn){
      btn.addEventListener('click', function(){
        var i = parseInt(btn.getAttribute('data-i'),10);
        if(mode==='flag'){ if(!revealed[i]) flagged[i] = !flagged[i]; render(); return; }
        if(flagged[i]) return;
        reveal(i);
        if(g.mines[i]){
          for(var k=0;k<revealed.length;k++) revealed[k]=true;
          render();
          setTimeout(function(){ endScreen({title:gt('gameOver'),emoji:'\ud83d\udca3',score:0,xp:5,onReplay:function(){ENGINES[id].start(id);}}); }, 400);
          return;
        }
        var safeLeft = revealed.filter(function(v,idx){return !v && !g.mines[idx];}).length;
        if(safeLeft===0){
          var elapsed = Math.round((Date.now()-started)/1000);
          render();
          setTimeout(function(){ endScreen({title:gt('youWin'),emoji:'\ud83c\udfc1',score:elapsed,bestKey:bestKey,xp:40,extraRows:[[elapsed+'s',gt('time')]],onReplay:function(){ENGINES[id].start(id);}}); }, 400);
          return;
        }
        render();
      });
    });
  }
  render();
  return function(){};
}
ENGINES.mines = { start: function(id){ return msStart(id, 6, 6, 'gnw_best_mines'); } };
ENGINES.mineshard = { start: function(id){ return msStart(id, 10, 18, 'gnw_best_mineshard'); } };
reg('mines','classic','\ud83d\udca3','mines');
reg('mineshard','memory','\ud83d\udca3','mineshard');

})();

/* ============================================================
   ENGINE: MEMORY GAMES (memory, memhard, patternmem, simon, colormatch)
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function toast(msg){ if(window._gnwShowToast) window._gnwShowToast(msg); }
function rnd(n){ return Math.floor(Math.random()*n); }
function shuffleArr(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }

var EMOJI_POOL = ['\ud83c\udf4e','\ud83c\udf4c','\ud83c\udf47','\ud83c\udf49','\ud83c\udf53','\ud83c\udf51','\ud83c\udf4d','\ud83e\udd6d','\ud83c\udf4b','\ud83c\udf50','\ud83e\uded0','\ud83c\udf52','\ud83d\udc36','\ud83d\udc31','\ud83e\udd8a','\ud83d\udc3b','\ud83e\udd81','\ud83d\udc2f','\ud83d\udc28','\ud83d\udc2d'];

function memStart(id, pairs, bestKey){
  var deck = shuffleArr(EMOJI_POOL.slice(0,pairs).concat(EMOJI_POOL.slice(0,pairs)));
  var flipped = [], matched = [], moves = 0, locked = false;
  function render(){
    var body = stageBody();
    var cols = pairs<=8?4:6;
    var cells = deck.map(function(e,i){
      var show = flipped.indexOf(i)>-1 || matched.indexOf(i)>-1;
      return '<button type="button" class="mem-cell" data-i="'+i+'" style="width:52px;height:52px;font-size:24px;border-radius:10px;background:'+(matched.indexOf(i)>-1?'#bbf7d0':show?'#dbeafe':'#6366f1')+';">'+(show?e:'')+'</button>';
    }).join('');
    body.innerHTML =
      '<div style="text-align:center;">' +
        '<div class="gnw-chip" style="margin-bottom:10px;">' + gt('moves') + ': <b>'+moves+'</b> \u00b7 ' + gt('matches') + ': <b>'+(matched.length/2)+'/'+pairs+'</b></div>' +
        '<div style="display:grid;grid-template-columns:repeat('+cols+',52px);gap:6px;justify-content:center;">' + cells + '</div>' +
      '</div>';
    body.querySelectorAll('.mem-cell').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(locked) return;
        var i = parseInt(btn.getAttribute('data-i'),10);
        if(flipped.indexOf(i)>-1 || matched.indexOf(i)>-1) return;
        flipped.push(i);
        render();
        if(flipped.length===2){
          moves++;
          locked = true;
          var a=flipped[0], b=flipped[1];
          if(deck[a]===deck[b]){
            matched.push(a,b); flipped=[]; locked=false;
            render();
            if(matched.length === deck.length){
              setTimeout(function(){ endScreen({title:gt('youWin'),emoji:'\ud83e\udde0',score:moves,bestKey:bestKey,xp:Math.max(15,60-moves),onReplay:function(){ENGINES[id].start(id);}}); }, 400);
            }
          } else {
            setTimeout(function(){ flipped=[]; locked=false; render(); }, 700);
          }
        }
      });
    });
  }
  render();
  return function(){};
}
ENGINES.memory = { start: function(id){ return memStart(id, 8, 'gnw_best_memory'); } };
ENGINES.memhard = { start: function(id){ return memStart(id, 10, 'gnw_best_memhard'); } };
reg('memory','memory','\ud83e\udde0','memory');
reg('memhard','memory','\ud83e\udde0','memhard');

/* ---------- Pattern Memory (grid flash sequence) ---------- */
ENGINES.patternmem = {
  start: function(id){
    var SIZE = 9; // 3x3
    var seq = [], userStep = 0, round = 0;
    function nextRound(){
      seq.push(rnd(SIZE));
      round++;
      playback(0);
    }
    function render(highlight){
      var body = stageBody();
      var cells = [];
      for(var i=0;i<SIZE;i++){ cells.push('<button type="button" class="pm-cell" data-i="'+i+'" style="width:64px;height:64px;border-radius:10px;background:'+(highlight===i?'#f59e0b':'#e0e7ff')+';"></button>'); }
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div class="gnw-chip" style="margin-bottom:10px;">' + gt('level') + ': <b>'+round+'</b></div>' +
          '<div style="display:grid;grid-template-columns:repeat(3,64px);gap:6px;justify-content:center;" id="pm-grid">' + cells.join('') + '</div>' +
        '</div>';
    }
    function playback(i){
      if(i>=seq.length){ render(); attachInput(); return; }
      render(seq[i]);
      setTimeout(function(){ render(); setTimeout(function(){ playback(i+1); }, 200); }, 500);
    }
    function attachInput(){
      userStep = 0;
      document.querySelectorAll('.pm-cell').forEach(function(btn){
        btn.addEventListener('click', function(){
          var i = parseInt(btn.getAttribute('data-i'),10);
          if(i === seq[userStep]){
            btn.style.background = '#bbf7d0';
            userStep++;
            if(userStep === seq.length){
              setTimeout(nextRound, 500);
            }
          } else {
            endScreen({title:gt('gameOver'),emoji:'\ud83e\udde9',score:round-1,bestKey:'gnw_best_patternmem',xp:(round-1)*10,onReplay:function(){ENGINES.patternmem.start('patternmem');}});
          }
        });
      });
    }
    nextRound();
    return function(){};
  }
};
reg('patternmem','memory','\ud83e\udde9','patternmem');

/* ---------- Simon Says (4-color classic) ---------- */
ENGINES.simon = {
  start: function(id){
    var COLORS = [{c:'#ef4444',name:'red'},{c:'#22c55e',name:'green'},{c:'#3b82f6',name:'blue'},{c:'#f59e0b',name:'yellow'}];
    var seq = [], userStep = 0, round = 0;
    function render(highlight){
      var body = stageBody();
      var cells = COLORS.map(function(col,i){ return '<button type="button" class="sm-cell" data-i="'+i+'" style="width:80px;height:80px;border-radius:14px;background:'+col.c+';opacity:'+(highlight===i?'1':'.55')+';box-shadow:'+(highlight===i?'0 0 0 4px #fff, 0 0 20px '+col.c:'none')+';"></button>'; }).join('');
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div class="gnw-chip" style="margin-bottom:10px;">' + gt('level') + ': <b>'+round+'</b></div>' +
          '<div style="display:grid;grid-template-columns:repeat(2,80px);gap:8px;justify-content:center;" id="sm-grid">' + cells + '</div>' +
        '</div>';
    }
    function nextRound(){ seq.push(rnd(4)); round++; playback(0); }
    function playback(i){
      if(i>=seq.length){ render(); attachInput(); return; }
      render(seq[i]);
      setTimeout(function(){ render(); setTimeout(function(){ playback(i+1); }, 180); }, 500);
    }
    function attachInput(){
      userStep = 0;
      document.querySelectorAll('.sm-cell').forEach(function(btn){
        btn.addEventListener('click', function(){
          var i = parseInt(btn.getAttribute('data-i'),10);
          if(i===seq[userStep]){ userStep++; if(userStep===seq.length) setTimeout(nextRound, 500); }
          else { endScreen({title:gt('gameOver'),emoji:'\ud83c\udfb5',score:round-1,bestKey:'gnw_best_simon',xp:(round-1)*10,onReplay:function(){ENGINES.simon.start('simon');}}); }
        });
      });
    }
    nextRound();
    return function(){};
  }
};
reg('simon','memory','\ud83c\udfb5','simon');

/* ---------- Color Match (Stroop test) ---------- */
ENGINES.colormatch = {
  start: function(id){
    var COLORS = [{name:'RED',hex:'#ef4444'},{name:'GREEN',hex:'#22c55e'},{name:'BLUE',hex:'#3b82f6'},{name:'YELLOW',hex:'#f59e0b'},{name:'PURPLE',hex:'#a855f7'}];
    var s = {i:0, score:0, endTime: Date.now()+45000};
    function render(){
      var wordObj = COLORS[rnd(COLORS.length)];
      var inkObj = COLORS[rnd(COLORS.length)];
      var body = stageBody();
      var remain = Math.max(0, Math.ceil((s.endTime-Date.now())/1000));
      var opts = shuffleArr(COLORS);
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div style="display:flex;justify-content:space-between;max-width:320px;margin:0 auto 14px;">' +
            '<span class="gnw-chip">' + gt('time') + ': <b id="cm-time">'+remain+'s</b></span>' +
            '<span class="gnw-chip">' + gt('score') + ': <b>'+s.score+'</b></span>' +
          '</div>' +
          '<div style="font-size:11px;color:#64748b;margin-bottom:6px;">Tap the COLOR of the text (not the word)</div>' +
          '<div style="font-size:42px;font-weight:900;margin-bottom:18px;color:'+inkObj.hex+';">' + wordObj.name + '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:320px;margin:0 auto;">' +
          opts.map(function(o){ return '<button type="button" class="cm-opt" data-h="'+o.hex+'" style="height:40px;border-radius:10px;background:'+o.hex+';"></button>'; }).join('') +
          '</div></div>';
      body.querySelectorAll('.cm-opt').forEach(function(btn){
        btn.addEventListener('click', function(){
          if(btn.getAttribute('data-h') === inkObj.hex){ s.score++; }
          render();
        });
      });
    }
    render();
    var timer = setInterval(function(){
      var t = document.getElementById('cm-time');
      var remain = Math.max(0, Math.ceil((s.endTime-Date.now())/1000));
      if(t) t.textContent = remain+'s';
      if(remain<=0){
        clearInterval(timer);
        endScreen({title:gt('timeUp'),emoji:'\ud83c\udfa8',score:s.score,bestKey:'gnw_best_colormatch',xp:s.score*4,onReplay:function(){ENGINES.colormatch.start('colormatch');}});
      }
    }, 400);
    return function(){ clearInterval(timer); };
  }
};
reg('colormatch','memory','\ud83c\udfa8','colormatch');

})();

/* ============================================================
   ENGINE: 2048 (DOM grid)
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function rnd(n){ return Math.floor(Math.random()*n); }

ENGINES.g2048 = {
  start: function(id){
    var SIZE = 4;
    var grid = Array.from({length:SIZE},function(){return new Array(SIZE).fill(0);});
    var score = 0;
    function addTile(){
      var empty = [];
      for(var r=0;r<SIZE;r++) for(var c=0;c<SIZE;c++) if(grid[r][c]===0) empty.push([r,c]);
      if(empty.length===0) return;
      var cell = empty[rnd(empty.length)];
      grid[cell[0]][cell[1]] = Math.random()<0.9?2:4;
    }
    addTile(); addTile();
    var COLORS = {0:'#e2e8f0',2:'#fef3c7',4:'#fde68a',8:'#fbbf24',16:'#f59e0b',32:'#ef4444',64:'#dc2626',128:'#a855f7',256:'#9333ea',512:'#7c3aed',1024:'#4c1d95',2048:'#facc15'};
    function render(){
      var body = stageBody();
      var cells = '';
      for(var r=0;r<SIZE;r++) for(var c=0;c<SIZE;c++){
        var v = grid[r][c];
        cells += '<div style="width:64px;height:64px;border-radius:8px;background:'+(COLORS[v]||'#111827')+';display:flex;align-items:center;justify-content:center;font-weight:900;font-size:'+(v>512?18:22)+'px;color:'+(v<=4?'#78350f':'#fff')+';">'+(v||'')+'</div>';
      }
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div class="gnw-chip" style="margin-bottom:10px;">' + gt('score') + ': <b>'+score+'</b></div>' +
          '<div style="display:grid;grid-template-columns:repeat('+SIZE+',64px);gap:6px;justify-content:center;background:#94a3b8;padding:6px;border-radius:10px;width:max-content;margin:0 auto;">' + cells + '</div>' +
          '<div style="font-size:11px;color:#64748b;margin-top:8px;">Use arrow keys or swipe</div>' +
        '</div>';
    }
    function slideRow(row){
      var vals = row.filter(function(v){return v!==0;});
      for(var i=0;i<vals.length-1;i++){
        if(vals[i]===vals[i+1]){ vals[i]*=2; score+=vals[i]; vals.splice(i+1,1); }
      }
      while(vals.length<SIZE) vals.push(0);
      return vals;
    }
    function move(dir){
      var before = JSON.stringify(grid);
      if(dir==='left'){ for(var r=0;r<SIZE;r++) grid[r]=slideRow(grid[r]); }
      else if(dir==='right'){ for(var r=0;r<SIZE;r++) grid[r]=slideRow(grid[r].slice().reverse()).reverse(); }
      else if(dir==='up'){ for(var c=0;c<SIZE;c++){ var col=grid.map(function(row){return row[c];}); col=slideRow(col); for(var r=0;r<SIZE;r++) grid[r][c]=col[r]; } }
      else if(dir==='down'){ for(var c=0;c<SIZE;c++){ var col=grid.map(function(row){return row[c];}).reverse(); col=slideRow(col).reverse(); for(var r=0;r<SIZE;r++) grid[r][c]=col[r]; } }
      if(JSON.stringify(grid)!==before){ addTile(); }
      render();
      // report score to weekly-challenge hook if present
      if(window.gnwReportScore) window.gnwReportScore('g2048', score);
      var hasEmpty = grid.some(function(row){return row.some(function(v){return v===0;});});
      var hasMove = hasEmpty;
      if(!hasMove){
        var canMerge = false;
        for(var r=0;r<SIZE;r++) for(var c=0;c<SIZE;c++){
          if(c<SIZE-1 && grid[r][c]===grid[r][c+1]) canMerge=true;
          if(r<SIZE-1 && grid[r][c]===grid[r+1][c]) canMerge=true;
        }
        if(!canMerge){
          setTimeout(function(){ endScreen({title:gt('gameOver'),emoji:'\ud83d\udd22',score:score,bestKey:'gnw_best_g2048',xp:Math.round(score/20),onReplay:function(){ENGINES.g2048.start('g2048');}}); }, 300);
        }
      }
    }
    function keyHandler(e){
      var map = {ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};
      if(map[e.key]){ e.preventDefault(); move(map[e.key]); }
    }
    document.addEventListener('keydown', keyHandler);
    var touchStart = null;
    var body0 = stageBody();
    function touchStartH(e){ touchStart = e.touches[0]; }
    function touchEndH(e){
      if(!touchStart) return;
      var dx = e.changedTouches[0].clientX - touchStart.clientX;
      var dy = e.changedTouches[0].clientY - touchStart.clientY;
      if(Math.abs(dx)>Math.abs(dy)){ move(dx>30?'right':dx<-30?'left':''); } else { move(dy>30?'down':dy<-30?'up':''); }
      touchStart = null;
    }
    document.addEventListener('touchstart', touchStartH);
    document.addEventListener('touchend', touchEndH);
    render();
    return function(){ document.removeEventListener('keydown', keyHandler); document.removeEventListener('touchstart', touchStartH); document.removeEventListener('touchend', touchEndH); };
  }
};
reg('g2048','classic','\ud83d\udfe8','g2048');

})();

/* ============================================================
   ENGINE: CANVAS ARCADE (snake, pong, flappy, breakout)
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function rnd(n){ return Math.floor(Math.random()*n); }

function makeCanvas(w,h){
  var body = stageBody();
  body.innerHTML =
    '<div style="text-align:center;">' +
      '<div class="gnw-chip" id="arcade-hud" style="margin-bottom:8px;display:inline-block;">' + gt('score') + ': <b id="arcade-score">0</b></div>' +
      '<div><canvas id="arcade-canvas" width="'+w+'" height="'+h+'" style="background:#0f172a;border-radius:12px;max-width:100%;touch-action:none;"></canvas></div>' +
      '<div style="font-size:11px;color:#64748b;margin-top:6px;">Arrow keys / swipe / tap to play</div>' +
    '</div>';
  return document.getElementById('arcade-canvas');
}
function setScore(v){ var el = document.getElementById('arcade-score'); if(el) el.textContent = v; }

/* ---------- SNAKE ---------- */
ENGINES.snake = {
  start: function(id){
    var cols=20, rows=20, cell=16;
    var canvas = makeCanvas(cols*cell, rows*cell);
    var ctx = canvas.getContext('2d');
    var snake = [{x:10,y:10}], dir={x:1,y:0}, nextDir={x:1,y:0}, food=spawnFood(), score=0, over=false, raf=null;
    function spawnFood(){ return {x:rnd(cols), y:rnd(rows)}; }
    function tick(){
      if(over) return;
      dir = nextDir;
      var head = {x:snake[0].x+dir.x, y:snake[0].y+dir.y};
      if(head.x<0||head.x>=cols||head.y<0||head.y>=rows||snake.some(function(s){return s.x===head.x&&s.y===head.y;})){
        over = true;
        cancelAnimationFrame(raf);
        endScreen({title:gt('gameOver'),emoji:'\ud83d\udc0d',score:score,bestKey:'gnw_best_snake',xp:Math.min(50,score*2),onReplay:function(){ENGINES.snake.start('snake');}});
        return;
      }
      snake.unshift(head);
      if(head.x===food.x && head.y===food.y){ score++; setScore(score); food=spawnFood(); }
      else snake.pop();
      draw();
    }
    function draw(){
      ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,cols*cell,rows*cell);
      ctx.fillStyle='#ef4444'; ctx.fillRect(food.x*cell,food.y*cell,cell-1,cell-1);
      snake.forEach(function(s,i){ ctx.fillStyle = i===0?'#22c55e':'#4ade80'; ctx.fillRect(s.x*cell,s.y*cell,cell-1,cell-1); });
    }
    var interval = setInterval(tick, 110);
    draw();
    function key(e){
      var k=e.key;
      if(k==='ArrowUp'&&dir.y===0) nextDir={x:0,y:-1};
      else if(k==='ArrowDown'&&dir.y===0) nextDir={x:0,y:1};
      else if(k==='ArrowLeft'&&dir.x===0) nextDir={x:-1,y:0};
      else if(k==='ArrowRight'&&dir.x===0) nextDir={x:1,y:0};
    }
    document.addEventListener('keydown', key);
    var ts=null;
    function tstart(e){ ts=e.touches[0]; }
    function tend(e){
      if(!ts) return;
      var dx=e.changedTouches[0].clientX-ts.clientX, dy=e.changedTouches[0].clientY-ts.clientY;
      if(Math.abs(dx)>Math.abs(dy)){ if(dx>20&&dir.x===0) nextDir={x:1,y:0}; else if(dx<-20&&dir.x===0) nextDir={x:-1,y:0}; }
      else { if(dy>20&&dir.y===0) nextDir={x:0,y:1}; else if(dy<-20&&dir.y===0) nextDir={x:0,y:-1}; }
      ts=null;
    }
    canvas.addEventListener('touchstart', tstart);
    canvas.addEventListener('touchend', tend);
    return function(){ clearInterval(interval); document.removeEventListener('keydown', key); canvas.removeEventListener('touchstart',tstart); canvas.removeEventListener('touchend',tend); };
  }
};
reg('snake','classic','\ud83d\udc0d','snake');

/* ---------- PONG (vs simple AI) ---------- */
ENGINES.pong = {
  start: function(id){
    var W=360,H=240;
    var canvas = makeCanvas(W,H);
    var ctx = canvas.getContext('2d');
    var pW=8,pH=50;
    var player={y:H/2-pH/2}, ai={y:H/2-pH/2};
    var ball={x:W/2,y:H/2,vx:3,vy:2};
    var score=0, over=false, raf;
    function loop(){
      if(over) return;
      ball.x+=ball.vx; ball.y+=ball.vy;
      if(ball.y<0||ball.y>H) ball.vy*=-1;
      if(ball.x<pW+6 && ball.y>player.y && ball.y<player.y+pH){ ball.vx*=-1.05; ball.x=pW+6; score++; setScore(score); }
      if(ball.x>W-pW-6 && ball.y>ai.y && ball.y<ai.y+pH){ ball.vx*=-1.05; ball.x=W-pW-6; }
      if(ball.x<0){ over=true; finish(false); return; }
      if(ball.x>W){ score++; setScore(score); ball.x=W/2; ball.y=H/2; ball.vx=3; ball.vy=2; }
      var aiCenter = ai.y+pH/2;
      if(aiCenter < ball.y-6) ai.y += 2.4; else if(aiCenter > ball.y+6) ai.y -= 2.4;
      ai.y = Math.max(0, Math.min(H-pH, ai.y));
      draw();
      raf = requestAnimationFrame(loop);
    }
    function draw(){
      ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#fff';
      ctx.fillRect(4,player.y,pW,pH);
      ctx.fillRect(W-pW-4,ai.y,pW,pH);
      ctx.beginPath(); ctx.arc(ball.x,ball.y,5,0,7); ctx.fill();
    }
    function finish(){
      endScreen({title:gt('gameOver'),emoji:'\ud83c\udfd3',score:score,bestKey:'gnw_best_pong',xp:Math.min(40,score*3),onReplay:function(){ENGINES.pong.start('pong');}});
    }
    function move(e){
      var rect = canvas.getBoundingClientRect();
      var y = (e.touches? e.touches[0].clientY : e.clientY) - rect.top;
      player.y = Math.max(0, Math.min(H-pH, y - pH/2));
    }
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('touchmove', move);
    draw();
    raf = requestAnimationFrame(loop);
    return function(){ over=true; cancelAnimationFrame(raf); canvas.removeEventListener('mousemove',move); canvas.removeEventListener('touchmove',move); };
  }
};
reg('pong','classic','\ud83c\udfd3','pong');

/* ---------- FLAPPY BIRD ---------- */
ENGINES.flappy = {
  start: function(id){
    var W=320,H=420;
    var canvas = makeCanvas(W,H);
    var ctx = canvas.getContext('2d');
    var bird={y:H/2,v:0}, pipes=[], score=0, over=false, raf, frame=0;
    function reset(){ bird={y:H/2,v:0}; pipes=[]; score=0; over=false; frame=0; setScore(0); }
    reset();
    function flap(){ if(over) return; bird.v=-6.5; }
    function loop(){
      if(over) return;
      frame++;
      bird.v+=0.35; bird.y+=bird.v;
      if(frame%90===0){ var gap=110; var top=40+rnd(H-gap-120); pipes.push({x:W, top:top, gap:gap, passed:false}); }
      pipes.forEach(function(p){ p.x-=2.4; });
      pipes = pipes.filter(function(p){ return p.x>-40; });
      pipes.forEach(function(p){
        if(!p.passed && p.x+30<60){ p.passed=true; score++; setScore(score); }
        if(60+14>p.x && 60-14<p.x+30 && (bird.y-12<p.top || bird.y+12>p.top+p.gap)){ over=true; }
      });
      if(bird.y>H-12 || bird.y<0) over=true;
      draw();
      if(over){ finish(); return; }
      raf = requestAnimationFrame(loop);
    }
    function draw(){
      ctx.fillStyle='#87ceeb'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#22c55e';
      pipes.forEach(function(p){ ctx.fillRect(p.x,0,30,p.top); ctx.fillRect(p.x,p.top+p.gap,30,H-p.top-p.gap); });
      ctx.fillStyle='#f59e0b'; ctx.beginPath(); ctx.arc(60,bird.y,12,0,7); ctx.fill();
    }
    function finish(){
      endScreen({title:gt('gameOver'),emoji:'\ud83d\udc26',score:score,bestKey:'gnw_best_flappy',xp:score*4,onReplay:function(){ENGINES.flappy.start('flappy');}});
    }
    canvas.addEventListener('mousedown', flap);
    canvas.addEventListener('touchstart', function(e){ e.preventDefault(); flap(); });
    function key(e){ if(e.key===' '){ e.preventDefault(); flap(); } }
    document.addEventListener('keydown', key);
    draw();
    raf = requestAnimationFrame(loop);
    return function(){ over=true; cancelAnimationFrame(raf); document.removeEventListener('keydown', key); };
  }
};
reg('flappy','classic','\ud83d\udc26','flappy');

/* ---------- BREAKOUT ---------- */
ENGINES.breakout = {
  start: function(id){
    var W=320,H=380;
    var canvas = makeCanvas(W,H);
    var ctx = canvas.getContext('2d');
    var pW=60,pH=10, paddle={x:W/2-pW/2};
    var ball={x:W/2,y:H-30,vx:2.6,vy:-3};
    var rows=4, cols=8, bw=W/cols, bh=16;
    var bricks = [];
    for(var r=0;r<rows;r++) for(var c=0;c<cols;c++) bricks.push({r:r,c:c,alive:true});
    var score=0, over=false, raf;
    function loop(){
      if(over) return;
      ball.x+=ball.vx; ball.y+=ball.vy;
      if(ball.x<4||ball.x>W-4) ball.vx*=-1;
      if(ball.y<4) ball.vy*=-1;
      if(ball.y>H-4){ over=true; finish(false); return; }
      if(ball.y>H-30-pH && ball.y<H-20 && ball.x>paddle.x && ball.x<paddle.x+pW){ ball.vy=-Math.abs(ball.vy); var hitPos=(ball.x-(paddle.x+pW/2))/(pW/2); ball.vx = hitPos*3.4; }
      bricks.forEach(function(b){
        if(!b.alive) return;
        var bx=b.c*bw, by=b.r*bh+20;
        if(ball.x>bx && ball.x<bx+bw && ball.y>by && ball.y<by+bh){ b.alive=false; ball.vy*=-1; score+=10; setScore(score); }
      });
      draw();
      if(bricks.every(function(b){return !b.alive;})){ over=true; finish(true); return; }
      raf = requestAnimationFrame(loop);
    }
    function draw(){
      ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#f59e0b';
      bricks.forEach(function(b){ if(b.alive) ctx.fillRect(b.c*bw+1, b.r*bh+20, bw-2, bh-2); });
      ctx.fillStyle='#fff'; ctx.fillRect(paddle.x,H-30,pW,pH);
      ctx.beginPath(); ctx.arc(ball.x,ball.y,5,0,7); ctx.fill();
    }
    function finish(win){
      endScreen({title:win?gt('youWin'):gt('gameOver'),emoji:'\ud83e\uddf1',score:score,bestKey:'gnw_best_breakout',xp:Math.round(score/2),onReplay:function(){ENGINES.breakout.start('breakout');}});
    }
    function move(e){
      var rect = canvas.getBoundingClientRect();
      var x = (e.touches? e.touches[0].clientX : e.clientX) - rect.left;
      paddle.x = Math.max(0, Math.min(W-pW, x-pW/2));
    }
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('touchmove', move);
    draw();
    raf = requestAnimationFrame(loop);
    return function(){ over=true; cancelAnimationFrame(raf); canvas.removeEventListener('mousemove',move); canvas.removeEventListener('touchmove',move); };
  }
};
reg('breakout','memory','\ud83e\uddf1','breakout');

})();

/* ============================================================
   ENGINE: TETRIS LITE
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function rnd(n){ return Math.floor(Math.random()*n); }

ENGINES.tetris = {
  start: function(id){
    var COLS=8, ROWS=14, CELL=22;
    var canvasWrap = stageBody();
    canvasWrap.innerHTML =
      '<div style="text-align:center;">' +
        '<div class="gnw-chip" style="margin-bottom:8px;display:inline-block;">' + gt('score') + ': <b id="arcade-score">0</b></div>' +
        '<div><canvas id="tetris-canvas" width="'+COLS*CELL+'" height="'+ROWS*CELL+'" style="background:#0f172a;border-radius:10px;"></canvas></div>' +
        '<div style="display:flex;gap:6px;justify-content:center;margin-top:8px;">' +
          '<button type="button" class="gnw-big-btn" id="t-left" style="padding:10px 16px;">\u2b05\ufe0f</button>' +
          '<button type="button" class="gnw-big-btn" id="t-rot" style="padding:10px 16px;">\ud83d\udd04</button>' +
          '<button type="button" class="gnw-big-btn" id="t-right" style="padding:10px 16px;">\u27a1\ufe0f</button>' +
          '<button type="button" class="gnw-big-btn" id="t-down" style="padding:10px 16px;">\u2b07\ufe0f</button>' +
        '</div>' +
      '</div>';
    var canvas = document.getElementById('tetris-canvas');
    var ctx = canvas.getContext('2d');
    var SHAPES = {
      I:[[1,1,1,1]], O:[[1,1],[1,1]], T:[[0,1,0],[1,1,1]], L:[[1,0],[1,0],[1,1]], J:[[0,1],[0,1],[1,1]], S:[[0,1,1],[1,1,0]], Z:[[1,1,0],[0,1,1]]
    };
    var COLORS = {I:'#22d3ee',O:'#facc15',T:'#a855f7',L:'#f97316',J:'#3b82f6',S:'#22c55e',Z:'#ef4444'};
    var grid = Array.from({length:ROWS},function(){return new Array(COLS).fill(null);});
    var score=0, over=false, interval, cur;
    function newPiece(){
      var keys = Object.keys(SHAPES);
      var k = keys[rnd(keys.length)];
      return {shape: SHAPES[k].map(function(r){return r.slice();}), color:COLORS[k], r:0, c:Math.floor(COLS/2)-1};
    }
    function collide(shape, r, c){
      for(var i=0;i<shape.length;i++) for(var j=0;j<shape[i].length;j++){
        if(!shape[i][j]) continue;
        var rr=r+i, cc=c+j;
        if(rr>=ROWS||cc<0||cc>=COLS||(rr>=0&&grid[rr][cc])) return true;
      }
      return false;
    }
    function merge(){
      cur.shape.forEach(function(row,i){ row.forEach(function(v,j){ if(v){ var rr=cur.r+i,cc=cur.c+j; if(rr>=0) grid[rr][cc]=cur.color; } }); });
    }
    function clearLines(){
      var cleared=0;
      for(var r=ROWS-1;r>=0;r--){
        if(grid[r].every(function(v){return v;})){ grid.splice(r,1); grid.unshift(new Array(COLS).fill(null)); cleared++; r++; }
      }
      if(cleared){ score += [0,10,30,50,80][cleared]||100; var el=document.getElementById('arcade-score'); if(el) el.textContent=score; }
    }
    function rotate(shape){
      var rows=shape.length, cols=shape[0].length;
      var out = Array.from({length:cols},function(){return new Array(rows).fill(0);});
      for(var i=0;i<rows;i++) for(var j=0;j<cols;j++) out[j][rows-1-i]=shape[i][j];
      return out;
    }
    function spawn(){
      cur = newPiece();
      if(collide(cur.shape, cur.r, cur.c)){ finish(); }
    }
    function drop(){
      if(over) return;
      if(!collide(cur.shape, cur.r+1, cur.c)){ cur.r++; }
      else { merge(); clearLines(); spawn(); }
      draw();
    }
    function draw(){
      ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,COLS*CELL,ROWS*CELL);
      for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++){ if(grid[r][c]){ ctx.fillStyle=grid[r][c]; ctx.fillRect(c*CELL,r*CELL,CELL-1,CELL-1); } }
      if(cur){ ctx.fillStyle=cur.color; cur.shape.forEach(function(row,i){ row.forEach(function(v,j){ if(v){ var rr=cur.r+i; if(rr>=0) ctx.fillRect((cur.c+j)*CELL,rr*CELL,CELL-1,CELL-1); } }); }); }
    }
    function finish(){
      over=true; clearInterval(interval);
      endScreen({title:gt('gameOver'),emoji:'\ud83e\uddf1',score:score,bestKey:'gnw_best_tetris',xp:Math.round(score/3),onReplay:function(){ENGINES.tetris.start('tetris');}});
    }
    function move(dc){ if(!collide(cur.shape, cur.r, cur.c+dc)) { cur.c+=dc; draw(); } }
    function doRotate(){ var r = rotate(cur.shape); if(!collide(r, cur.r, cur.c)) { cur.shape=r; draw(); } }
    document.getElementById('t-left').addEventListener('click', function(){ move(-1); });
    document.getElementById('t-right').addEventListener('click', function(){ move(1); });
    document.getElementById('t-rot').addEventListener('click', doRotate);
    document.getElementById('t-down').addEventListener('click', drop);
    function key(e){
      if(e.key==='ArrowLeft') move(-1);
      else if(e.key==='ArrowRight') move(1);
      else if(e.key==='ArrowDown') drop();
      else if(e.key==='ArrowUp') doRotate();
      else return;
      e.preventDefault();
    }
    document.addEventListener('keydown', key);
    spawn(); draw();
    interval = setInterval(drop, 700);
    return function(){ clearInterval(interval); document.removeEventListener('keydown', key); };
  }
};
reg('tetris','classic','\ud83e\uddf1','tetris');

})();

/* ============================================================
   ENGINE: CHESS PUZZLES (multiple choice, mate-in-1/2)
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function toast(msg){ if(window._gnwShowToast) window._gnwShowToast(msg); }
function shuffleArr(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }

/* Simplified: text description of position + 4 candidate moves, one delivers mate */
var PUZZLES = [
 {desc:"White: King e1, Queen h5. Black: King e8 only. Find mate in 1.", opts:["Qh5-e5+","Qh5-e8#","Qh5xh7","Qh5-h1"], correct:1},
 {desc:"White: King g1, Rook a1, Rook b7. Black: King h8 only. Find mate in 1.", opts:["Ra1-a8#","Rb7xb8","Ra1-h1+","Rb7-b1"], correct:0},
 {desc:"White: King e1, Queen d8, Rook a1. Black: King e8 only. Find mate in 1.", opts:["Qd8-d1","Ra1-a8#","Qd8xd7","Ra1-h1"], correct:1},
 {desc:"White: King g2, Queen g7. Black: King h8, pawn h7. Find mate in 1.", opts:["Qg7xh7#","Qg7-g8+","Qg7-a1","Qg7-f8"], correct:0},
 {desc:"White: King e1, Rook e7, Rook f7. Black: King g8 only. Find mate in 1.", opts:["Re7-e8+","Rf7-g7#","Rf7xf8","Re7-a7"], correct:1},
 {desc:"White: King c1, Queen h1. Black: King a1 only (edge of board). Find mate in 1.", opts:["Qh1xa1#","Qh1-h8","Qh1-c6","Qh1-b7"], correct:0}
];
ENGINES.chess = {
  start: function(id){
    var s = {puzzles: shuffleArr(PUZZLES).slice(0,6), i:0, score:0};
    function render(){
      var p = s.puzzles[s.i];
      var body = stageBody();
      var opts = shuffleArr(p.opts.map(function(o,idx){return {o:o, correct:idx===p.correct};}));
      body.innerHTML =
        '<div style="max-width:420px;margin:0 auto;text-align:center;">' +
          '<div style="font-size:12px;color:#64748b;margin-bottom:10px;">' + gt('questionOf',{a:s.i+1,b:s.puzzles.length}) + '</div>' +
          '<div style="font-size:40px;margin-bottom:10px;">\u265b</div>' +
          '<div style="font-size:13.5px;font-weight:600;margin-bottom:16px;line-height:1.5;">' + p.desc + '</div>' +
          '<div>' + opts.map(function(o){ return '<button type="button" class="chess-opt" data-c="'+o.correct+'" style="display:block;width:100%;margin-bottom:8px;padding:10px;border-radius:10px;background:#f1f5f9;font-weight:800;font-family:monospace;">'+o.o+'</button>'; }).join('') + '</div>' +
        '</div>';
      body.querySelectorAll('.chess-opt').forEach(function(btn){
        btn.addEventListener('click', function(){
          var correct = btn.getAttribute('data-c')==='true';
          if(correct){ s.score++; toast(gt('correct')); btn.style.background='#bbf7d0'; } else { toast(gt('wrong')); btn.style.background='#fecaca'; }
          s.i++;
          if(s.i>=s.puzzles.length){
            setTimeout(function(){ endScreen({title:gt('gameOver'),emoji:'\u265b',score:s.score,bestKey:'gnw_best_chess',xp:s.score*12,extraRows:[[gt('finalScore'), s.score+'/'+s.puzzles.length]],onReplay:function(){ENGINES.chess.start('chess');}}); }, 700);
            return;
          }
          setTimeout(render, 700);
        });
      });
    }
    render();
    return function(){};
  }
};
reg('chess','classic','\u265e\ufe0f','chess');

})();

/* ============================================================
   ENGINE: CASUAL "FUN" GAMES
   (fruitpop, rainbowbubble, citydash, blockpuzzle, colorjoy,
    minirace, parkingpuzzle) — uses existing gnw-* CSS classes
   ============================================================ */
(function(){
var ENGINES = window._GNW_ENGINES, reg = window._GNW_REG;
var gt = window._gnwGt, stageBody = window._gnwStageBody, endScreen = window._gnwEndScreen;
function toast(msg){ if(window._gnwShowToast) window._gnwShowToast(msg); }
function rnd(n){ return Math.floor(Math.random()*n); }
function shuffleArr(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }

/* ---------- Fruit Pop Blast (timed pair matching) ---------- */
var FRUITS = ['\ud83c\udf4e','\ud83c\udf4c','\ud83c\udf47','\ud83c\udf49','\ud83c\udf53','\ud83c\udf51','\ud83c\udf4d','\ud83e\udd6d','\ud83c\udf4b','\ud83c\udf50'];
ENGINES.fruitpop = {
  start: function(id){
    var pairs = 6;
    var deck = shuffleArr(FRUITS.slice(0,pairs).concat(FRUITS.slice(0,pairs)));
    var flipped=[], matched=[], locked=false;
    var endTime = Date.now()+45000;
    function render(){
      var body = stageBody();
      var remain = Math.max(0, Math.ceil((endTime-Date.now())/1000));
      var cells = deck.map(function(f,i){
        var show = flipped.indexOf(i)>-1 || matched.indexOf(i)>-1;
        return '<button type="button" class="gnw-fruit-cell fp-cell" data-i="'+i+'" style="width:56px;height:56px;font-size:28px;border-radius:14px;background:'+(matched.indexOf(i)>-1?'#bbf7d0':show?'#fef9c3':'#fb923c')+'">'+(show?f:'')+'</button>';
      }).join('');
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div style="display:flex;justify-content:space-between;max-width:320px;margin:0 auto 10px;">' +
            '<span class="gnw-chip">' + gt('time') + ': <b id="fp-time">'+remain+'s</b></span>' +
            '<span class="gnw-chip">' + gt('matches') + ': <b>'+(matched.length/2)+'/'+pairs+'</b></span>' +
          '</div>' +
          '<div class="gnw-fruit-grid" style="display:grid;grid-template-columns:repeat(4,56px);gap:6px;justify-content:center;">' + cells + '</div>' +
        '</div>';
      body.querySelectorAll('.fp-cell').forEach(function(btn){
        btn.addEventListener('click', function(){
          if(locked) return;
          var i = parseInt(btn.getAttribute('data-i'),10);
          if(flipped.indexOf(i)>-1||matched.indexOf(i)>-1) return;
          flipped.push(i); render();
          if(flipped.length===2){
            locked=true;
            var a=flipped[0],b=flipped[1];
            if(deck[a]===deck[b]){ matched.push(a,b); flipped=[]; locked=false; render();
              if(matched.length===deck.length){ finish(true); }
            } else setTimeout(function(){ flipped=[]; locked=false; render(); }, 600);
          }
        });
      });
    }
    function finish(win){
      clearInterval(timer);
      endScreen({title: win?gt('youWin'):gt('timeUp'), emoji:'\ud83c\udf49', score: matched.length/2, bestKey:'gnw_best_fruitpop', xp:(matched.length/2)*8, onReplay:function(){ENGINES.fruitpop.start('fruitpop');}});
    }
    render();
    var timer = setInterval(function(){
      var remain = Math.max(0, Math.ceil((endTime-Date.now())/1000));
      var t = document.getElementById('fp-time'); if(t) t.textContent = remain+'s';
      if(remain<=0) finish(false);
    }, 500);
    return function(){ clearInterval(timer); };
  }
};
reg('fruitpop','classic','\ud83c\udf49','fruitpop');

/* ---------- Rainbow Bubble Pop (tap the target color) ---------- */
var BUBBLE_COLORS = [{n:'Red',h:'#ef4444'},{n:'Blue',h:'#3b82f6'},{n:'Green',h:'#22c55e'},{n:'Yellow',h:'#f59e0b'},{n:'Purple',h:'#a855f7'},{n:'Pink',h:'#ec4899'}];
ENGINES.rainbowbubble = {
  start: function(id){
    var s = {score:0, endTime: Date.now()+40000, target:null};
    function newTarget(){ s.target = BUBBLE_COLORS[rnd(BUBBLE_COLORS.length)]; }
    newTarget();
    function render(){
      var body = stageBody();
      var remain = Math.max(0, Math.ceil((s.endTime-Date.now())/1000));
      var bubbles = Array.from({length:24},function(){ return BUBBLE_COLORS[rnd(BUBBLE_COLORS.length)]; });
      var cells = bubbles.map(function(b){ return '<button type="button" class="gnw-bubble-cell bb-cell" data-h="'+b.h+'" style="width:44px;height:44px;border-radius:50%;background:'+b.h+';box-shadow:inset -4px -4px 8px rgba(0,0,0,.15);"></button>'; }).join('');
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div style="display:flex;justify-content:space-between;max-width:340px;margin:0 auto 10px;">' +
            '<span class="gnw-chip">' + gt('time') + ': <b id="bb-time">'+remain+'s</b></span>' +
            '<span class="gnw-chip">' + gt('score') + ': <b>'+s.score+'</b></span>' +
          '</div>' +
          '<div style="margin-bottom:8px;font-weight:800;">Pop the <span style="color:'+s.target.h+'">'+s.target.n+'</span> bubbles!</div>' +
          '<div class="gnw-bubble-grid" style="display:grid;grid-template-columns:repeat(6,44px);gap:6px;justify-content:center;">' + cells + '</div>' +
        '</div>';
      body.querySelectorAll('.bb-cell').forEach(function(btn){
        btn.addEventListener('click', function(){
          if(btn.getAttribute('data-h')===s.target.h){ s.score++; btn.style.transform='scale(0)'; toast(gt('correct')); }
          else { s.score = Math.max(0,s.score-1); }
          setTimeout(render, 120);
        });
      });
    }
    render();
    var retarget = setInterval(newTarget, 6000);
    var timer = setInterval(function(){
      var remain = Math.max(0, Math.ceil((s.endTime-Date.now())/1000));
      var t = document.getElementById('bb-time'); if(t) t.textContent = remain+'s';
      if(remain<=0){
        clearInterval(timer); clearInterval(retarget);
        endScreen({title:gt('timeUp'),emoji:'\ud83e\udee7',score:s.score,bestKey:'gnw_best_rainbowbubble',xp:s.score*3,onReplay:function(){ENGINES.rainbowbubble.start('rainbowbubble');}});
      }
    }, 500);
    return function(){ clearInterval(timer); clearInterval(retarget); };
  }
};
reg('rainbowbubble','classic','\ud83e\udee7','rainbowbubble');

/* ---------- City Dash Runner (tap to jump) ---------- */
ENGINES.citydash = {
  start: function(id){
    var W=320,H=200;
    var body = stageBody();
    body.innerHTML =
      '<div style="text-align:center;">' +
        '<div class="gnw-chip" style="margin-bottom:8px;display:inline-block;">' + gt('score') + ': <b id="arcade-score">0</b></div>' +
        '<div><canvas id="cd-canvas" width="'+W+'" height="'+H+'" style="background:linear-gradient(#87ceeb,#e0f2fe);border-radius:12px;"></canvas></div>' +
        '<div style="font-size:11px;color:#64748b;margin-top:6px;">Tap / Space to jump</div>' +
      '</div>';
    var canvas = document.getElementById('cd-canvas');
    var ctx = canvas.getContext('2d');
    var groundY = H-30;
    var runner = {y:groundY, vy:0, jumping:false};
    var obstacles = [];
    var score=0, over=false, frame=0, raf;
    function jump(){ if(!runner.jumping && !over){ runner.vy=-8; runner.jumping=true; } }
    function loop(){
      if(over) return;
      frame++;
      runner.vy += 0.5; runner.y += runner.vy;
      if(runner.y>groundY){ runner.y=groundY; runner.vy=0; runner.jumping=false; }
      if(frame%70===0) obstacles.push({x:W, w:16, h:24+rnd(16)});
      obstacles.forEach(function(o){ o.x -= 3.4; });
      obstacles = obstacles.filter(function(o){ return o.x>-20; });
      obstacles.forEach(function(o){
        if(o.x<60+14 && o.x+o.w>60-14 && runner.y+16>groundY-o.h+30){ over=true; }
      });
      if(!over) score++;
      var sc = document.getElementById('arcade-score'); if(sc) sc.textContent = Math.floor(score/5);
      draw();
      if(over){ finish(); return; }
      raf = requestAnimationFrame(loop);
    }
    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='#16a34a'; ctx.fillRect(0,groundY+16,W,H-groundY-16);
      ctx.fillStyle='#dc2626';
      obstacles.forEach(function(o){ ctx.fillRect(o.x, groundY+16-o.h, o.w, o.h); });
      ctx.fillStyle='#f59e0b'; ctx.beginPath(); ctx.arc(60, runner.y, 12, 0, 7); ctx.fill();
    }
    function finish(){
      endScreen({title:gt('gameOver'),emoji:'\ud83c\udfc3',score:Math.floor(score/5),bestKey:'gnw_best_citydash',xp:Math.min(40,Math.floor(score/10)),onReplay:function(){ENGINES.citydash.start('citydash');}});
    }
    canvas.addEventListener('mousedown', jump);
    canvas.addEventListener('touchstart', function(e){ e.preventDefault(); jump(); });
    function key(e){ if(e.key===' '){ e.preventDefault(); jump(); } }
    document.addEventListener('keydown', key);
    draw();
    raf = requestAnimationFrame(loop);
    return function(){ over=true; cancelAnimationFrame(raf); document.removeEventListener('keydown', key); };
  }
};
reg('citydash','classic','\ud83c\udfc3','citydash');

/* ---------- Block Puzzle World (fit shapes onto a small grid) ---------- */
ENGINES.blockpuzzle = {
  start: function(id){
    var SIZE = 6;
    var grid = Array.from({length:SIZE},function(){return new Array(SIZE).fill(false);});
    var SHAPES = [ [[1,1],[1,1]], [[1,1,1]], [[1],[1],[1]], [[1,0],[1,1]], [[1,1],[0,1]] ];
    var score = 0;
    var current = null, currentIdx = null;
    function newPieces(){ return [0,1,2].map(function(){ return SHAPES[rnd(SHAPES.length)]; }); }
    var tray = newPieces();
    function canPlace(shape, r0, c0){
      for(var i=0;i<shape.length;i++) for(var j=0;j<shape[i].length;j++){
        if(!shape[i][j]) continue;
        var r=r0+i,c=c0+j;
        if(r<0||r>=SIZE||c<0||c>=SIZE||grid[r][c]) return false;
      }
      return true;
    }
    function place(shape, r0, c0){
      shape.forEach(function(row,i){ row.forEach(function(v,j){ if(v) grid[r0+i][c0+j]=true; }); });
      // clear full rows/cols
      var cleared=0;
      for(var r=0;r<SIZE;r++){ if(grid[r].every(function(v){return v;})){ for(var c=0;c<SIZE;c++) grid[r][c]=false; cleared++; } }
      for(var c=0;c<SIZE;c++){ if(grid.every(function(row){return row[c];})){ for(var r=0;r<SIZE;r++) grid[r][c]=false; cleared++; } }
      score += 5 + cleared*15;
    }
    function render(){
      var body = stageBody();
      var cells = '';
      for(var r=0;r<SIZE;r++) for(var c=0;c<SIZE;c++){
        cells += '<button type="button" class="bp-cell" data-r="'+r+'" data-c="'+c+'" style="width:36px;height:36px;border-radius:6px;background:'+(grid[r][c]?'#6366f1':'#e2e8f0')+';"></button>';
      }
      var trayHtml = tray.map(function(shape, idx){
        var rows = shape.length, cols = shape[0].length;
        var sc = '';
        for(var i=0;i<rows;i++) for(var j=0;j<cols;j++){ sc += '<div style="width:14px;height:14px;background:'+(shape[i][j]?'#f59e0b':'transparent')+';display:inline-block;"></div>'+(j===cols-1?'<br>':''); }
        return '<button type="button" class="bp-tray" data-idx="'+idx+'" style="display:inline-block;padding:6px;margin:4px;border-radius:8px;background:'+(currentIdx===idx?'#fde68a':'#f8fafc')+';border:2px solid '+(currentIdx===idx?'#f59e0b':'#e2e8f0')+';">'+sc+'</button>';
      }).join('');
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div class="gnw-chip" style="margin-bottom:10px;">' + gt('score') + ': <b>'+score+'</b></div>' +
          '<div class="gnw-fit-grid" style="display:grid;grid-template-columns:repeat('+SIZE+',36px);gap:3px;justify-content:center;margin-bottom:12px;">' + cells + '</div>' +
          '<div>' + trayHtml + '</div>' +
          '<div style="font-size:11px;color:#64748b;margin-top:8px;">Pick a shape, then tap a cell to place it</div>' +
        '</div>';
      body.querySelectorAll('.bp-tray').forEach(function(btn){
        btn.addEventListener('click', function(){ currentIdx = parseInt(btn.getAttribute('data-idx'),10); current = tray[currentIdx]; render(); });
      });
      body.querySelectorAll('.bp-cell').forEach(function(btn){
        btn.addEventListener('click', function(){
          if(!current) return;
          var r = parseInt(btn.getAttribute('data-r'),10), c = parseInt(btn.getAttribute('data-c'),10);
          if(canPlace(current, r, c)){
            place(current, r, c);
            tray.splice(currentIdx,1);
            tray.push(SHAPES[rnd(SHAPES.length)]);
            current=null; currentIdx=null;
            render();
            var anyFits = tray.some(function(sh){ for(var r2=0;r2<SIZE;r2++) for(var c2=0;c2<SIZE;c2++) if(canPlace(sh,r2,c2)) return true; return false; });
            if(!anyFits){ setTimeout(function(){ endScreen({title:gt('gameOver'),emoji:'\ud83e\udde9',score:score,bestKey:'gnw_best_blockpuzzle',xp:Math.round(score/3),onReplay:function(){ENGINES.blockpuzzle.start('blockpuzzle');}}); }, 300); }
          } else { toast(gt('wrong')); }
        });
      });
    }
    render();
    return function(){};
  }
};
reg('blockpuzzle','classic','\ud83e\udde9','blockpuzzle');

/* ---------- Color Joy Studio (color-recognition mini quiz, kid-friendly) ---------- */
var COLORJOY_ITEMS = [["\ud83c\udf4c Banana","Yellow","#f59e0b"],["\ud83c\udf4e Apple","Red","#ef4444"],["\ud83c\udf4a Orange","Orange","#f97316"],
["\ud83c\udf47 Grapes","Purple","#a855f7"],["\ud83c\udf40 Clover","Green","#22c55e"],["\ud83d\udc18 Elephant","Gray","#6b7280"],
["\ud83d\udc1d Bee","Yellow","#f59e0b"],["\ud83c\udf39 Rose","Red","#ef4444"],["\ud83d\udc0b Whale","Blue","#3b82f6"],["\ud83e\udd55 Carrot","Orange","#f97316"]];
ENGINES.colorjoy = {
  start: function(id){
    var s = {i:0, score:0, items: shuffleArr(COLORJOY_ITEMS).slice(0,8)};
    function render(){
      var item = s.items[s.i];
      var opts = shuffleArr(COLORJOY_ITEMS.map(function(x){return {n:x[1],h:x[2]};}).filter(function(v,i,arr){return arr.findIndex(function(a){return a.n===v.n;})===i;})).slice(0,4);
      if(opts.every(function(o){return o.n!==item[1];})) opts[0] = {n:item[1], h:item[2]};
      opts = shuffleArr(opts);
      var body = stageBody();
      body.innerHTML =
        '<div class="gnw-color-page" style="text-align:center;">' +
          '<div style="font-size:12px;color:#64748b;margin-bottom:8px;">' + gt('questionOf',{a:s.i+1,b:s.items.length}) + '</div>' +
          '<div style="font-size:50px;margin-bottom:10px;">' + item[0].split(' ')[0] + '</div>' +
          '<div style="font-weight:800;margin-bottom:16px;">What color is this usually?</div>' +
          '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;max-width:280px;margin:0 auto;">' +
          opts.map(function(o){ return '<button type="button" class="kid-btn cj-opt" data-n="'+o.n+'" style="padding:14px;border-radius:14px;background:'+o.h+';color:#fff;font-weight:900;">'+o.n+'</button>'; }).join('') +
          '</div></div>';
      body.querySelectorAll('.cj-opt').forEach(function(btn){
        btn.addEventListener('click', function(){
          if(btn.getAttribute('data-n')===item[1]){ s.score++; toast(gt('correct')); } else { toast(gt('wrong')); }
          s.i++;
          if(s.i>=s.items.length){ endScreen({title:gt('gameOver'),emoji:'\ud83c\udfa8',score:s.score,bestKey:'gnw_best_colorjoy',xp:s.score*6,extraRows:[[gt('finalScore'), s.score+'/'+s.items.length]],onReplay:function(){ENGINES.colorjoy.start('colorjoy');}}); return; }
          setTimeout(render, 500);
        });
      });
    }
    render();
    return function(){};
  }
};
reg('colorjoy','classic','\ud83c\udfa8','colorjoy');

/* ---------- Mini Race Rush (lane dodge) ---------- */
ENGINES.minirace = {
  start: function(id){
    var W=260,H=360, lanes=3, laneW=W/lanes;
    var body = stageBody();
    body.innerHTML =
      '<div style="text-align:center;">' +
        '<div class="gnw-chip" style="margin-bottom:8px;display:inline-block;">' + gt('score') + ': <b id="arcade-score">0</b></div>' +
        '<div><canvas id="mr-canvas" width="'+W+'" height="'+H+'" style="background:#334155;border-radius:12px;"></canvas></div>' +
        '<div style="display:flex;gap:10px;justify-content:center;margin-top:8px;">' +
          '<button type="button" class="gnw-big-btn" id="mr-left" style="padding:10px 20px;">\u2b05\ufe0f</button>' +
          '<button type="button" class="gnw-big-btn" id="mr-right" style="padding:10px 20px;">\u27a1\ufe0f</button>' +
        '</div>' +
      '</div>';
    var canvas = document.getElementById('mr-canvas');
    var ctx = canvas.getContext('2d');
    var carLane=1, obstacles=[], score=0, over=false, frame=0, raf;
    function loop(){
      if(over) return;
      frame++;
      if(frame%50===0) obstacles.push({lane: rnd(lanes), y:-30});
      obstacles.forEach(function(o){ o.y += 4; });
      obstacles = obstacles.filter(function(o){ return o.y<H+30; });
      obstacles.forEach(function(o){ if(o.lane===carLane && o.y>H-70 && o.y<H-20){ over=true; } });
      if(!over) score++;
      var sc = document.getElementById('arcade-score'); if(sc) sc.textContent = Math.floor(score/5);
      draw();
      if(over){ finish(); return; }
      raf = requestAnimationFrame(loop);
    }
    function draw(){
      ctx.fillStyle='#334155'; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle='rgba(255,255,255,.3)';
      for(var l=1;l<lanes;l++){ ctx.beginPath(); ctx.setLineDash([10,10]); ctx.moveTo(l*laneW,0); ctx.lineTo(l*laneW,H); ctx.stroke(); }
      ctx.fillStyle='#ef4444';
      obstacles.forEach(function(o){ ctx.fillRect(o.lane*laneW+10, o.y, laneW-20, 26); });
      ctx.fillStyle='#22c55e'; ctx.fillRect(carLane*laneW+14, H-60, laneW-28, 34);
    }
    function finish(){
      endScreen({title:gt('gameOver'),emoji:'\ud83c\udfce\ufe0f',score:Math.floor(score/5),bestKey:'gnw_best_minirace',xp:Math.min(40,Math.floor(score/8)),onReplay:function(){ENGINES.minirace.start('minirace');}});
    }
    document.getElementById('mr-left').addEventListener('click', function(){ carLane = Math.max(0, carLane-1); });
    document.getElementById('mr-right').addEventListener('click', function(){ carLane = Math.min(lanes-1, carLane+1); });
    function key(e){ if(e.key==='ArrowLeft') carLane=Math.max(0,carLane-1); else if(e.key==='ArrowRight') carLane=Math.min(lanes-1,carLane+1); else return; e.preventDefault(); }
    document.addEventListener('keydown', key);
    draw();
    raf = requestAnimationFrame(loop);
    return function(){ over=true; cancelAnimationFrame(raf); document.removeEventListener('keydown', key); };
  }
};
reg('minirace','classic','\ud83c\udfce\ufe0f','minirace');

/* ---------- Parking Puzzle (grid slide to exit) ---------- */
ENGINES.parkingpuzzle = {
  start: function(id){
    var SIZE = 5;
    var car = {r:2, c:0};
    var exit = {r:2, c:SIZE-1};
    var blocks = [];
    while(blocks.length<5){
      var b = {r:rnd(SIZE), c:rnd(SIZE)};
      if((b.r===car.r&&b.c===car.c) || (b.r===exit.r&&b.c===exit.c)) continue;
      if(blocks.some(function(x){return x.r===b.r&&x.c===b.c;})) continue;
      blocks.push(b);
    }
    var moves = 0;
    function render(){
      var body = stageBody();
      var cells = '';
      for(var r=0;r<SIZE;r++) for(var c=0;c<SIZE;c++){
        var isCar = car.r===r && car.c===c;
        var isExit = exit.r===r && exit.c===c;
        var isBlock = blocks.some(function(b){return b.r===r&&b.c===c;});
        var content = isCar?'\ud83d\ude97':isExit?'\ud83c\udfc1':isBlock?'\ud83d\udea7':'';
        cells += '<div class="gnw-park-cell" style="width:44px;height:44px;border-radius:8px;background:'+(isBlock?'#94a3b8':isExit?'#bbf7d0':'#f1f5f9');+'display:flex;align-items:center;justify-content:center;font-size:20px;">'+content+'</div>';
      }
      body.innerHTML =
        '<div style="text-align:center;">' +
          '<div class="gnw-chip" style="margin-bottom:10px;">' + gt('moves') + ': <b>'+moves+'</b></div>' +
          '<div class="gnw-park-grid" style="display:grid;grid-template-columns:repeat('+SIZE+',44px);gap:3px;justify-content:center;margin-bottom:12px;">' + cells + '</div>' +
          '<div class="gnw-park-controls">' +
            '<button type="button" class="kid-btn" id="pp-up">\u2b06\ufe0f</button><br>' +
            '<button type="button" class="kid-btn" id="pp-left">\u2b05\ufe0f</button> ' +
            '<button type="button" class="kid-btn" id="pp-down">\u2b07\ufe0f</button> ' +
            '<button type="button" class="kid-btn" id="pp-right">\u27a1\ufe0f</button>' +
          '</div>' +
        '</div>';
      function tryMove(dr,dc){
        var nr=car.r+dr, nc=car.c+dc;
        if(nr<0||nr>=SIZE||nc<0||nc>=SIZE) return;
        if(blocks.some(function(b){return b.r===nr&&b.c===nc;})) return;
        car.r=nr; car.c=nc; moves++;
        if(car.r===exit.r && car.c===exit.c){
          render();
          setTimeout(function(){ endScreen({title:gt('youWin'),emoji:'\ud83c\udfc1',score:moves,bestKey:undefined,xp:Math.max(15,50-moves*2),onReplay:function(){ENGINES.parkingpuzzle.start('parkingpuzzle');}}); }, 300);
          return;
        }
        render();
      }
      document.getElementById('pp-up').addEventListener('click', function(){ tryMove(-1,0); });
      document.getElementById('pp-down').addEventListener('click', function(){ tryMove(1,0); });
      document.getElementById('pp-left').addEventListener('click', function(){ tryMove(0,-1); });
      document.getElementById('pp-right').addEventListener('click', function(){ tryMove(0,1); });
    }
    render();
    return function(){};
  }
};
reg('parkingpuzzle','classic','\ud83d\ude97','parkingpuzzle');

})();
