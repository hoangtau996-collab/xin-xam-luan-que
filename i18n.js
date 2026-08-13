// i18n.js — Internationalization System for Xin Xăm Luận Quẻ
// Supports Vietnamese (vi) and English (en)

const TRANSLATIONS = {
  vi: {
    // Header
    'header.title': 'Xin Xăm Luận Quẻ',
    'header.subtitle': 'Chân Thành Sở Cầu - Tất Hữu Linh Ứng',

    // Navigation
    'nav.fortune': '⛩️ Xin Xăm Gieo Quẻ',
    'nav.kinhdich': '☯️ Gieo Quẻ Kinh Dịch',
    'nav.meditation': '🌸 Tịnh Tâm Gõ Mõ',

    // Step 1: Gieo Keo
    'step1.indicator': 'Bước 1: Xin Keo Âm Dương',
    'step1.title': 'Gieo Keo Định Mệnh',
    'step1.desc_html': 'Trước khi gieo, xin hãy nhắm mắt tĩnh tâm, <strong>thành kính khấn nguyện lời khấn trong tâm</strong> (họ tên, tuổi, việc cần cầu hỏi). Sau đó chọn chế độ luận giải và nhấn nút <strong>Gieo Keo</strong> (Cần gieo được 1 Sấp - 1 Ngửa, tối đa 3 lần).',
    'step1.mode_label': 'Hình thức luận giải quẻ:',
    'step1.mode_full_title': 'Luận Giải Trọn Vẹn',
    'step1.mode_full_desc': 'Thơ thần, dịch nghĩa và các khía cạnh cuộc sống.',
    'step1.mode_instant_title': 'Lời Khuyên Tức Thì',
    'step1.mode_instant_desc': 'Loại quẻ tốt/xấu kèm lời chỉ dẫn ngắn gọn.',
    'step1.block_title': 'Chưa Thể Xin Quẻ',
    'step1.block_desc': 'Bạn đã gieo keo bất thành cả 3 lần. Xin hãy thành tâm đợi thời cơ khác.',
    'step1.block_comeback': 'Quay lại sau 30 phút để khấn nguyện lại.',
    'step1.keo_ngua': 'Ngửa (Dương)',
    'step1.keo_sap': 'Sấp (Âm)',
    'step1.keo_default_msg': 'Hãy nhấn "Gieo Keo" bên dưới.',
    'step1.btn_toss': 'Gieo Keo Âm Dương',
    'step1.btn_next': 'Tiến Tới Lắc Xăm',

    // Step 2: Lắc Xăm
    'step2.indicator': 'Bước 2: Lắc Ống Xăm',
    'step2.title': 'Thành Tâm Lắc Ống Xăm',
    'step2.desc': 'Nhấp chuột hoặc chạm liên tục vào ống xăm **trên 10 lần** để năng lượng tâm linh tích tụ và thẻ xăm xuất hiện.',
    'step2.shake_label': 'Thành tâm lắc:',
    'step2.shake_unit': 'lần',
    'step2.tube_label': 'XĂM<br>LINH<br>QUẺ',
    'step2.instruction': 'Nhấp/Chạm vào ống xăm hoặc lắc điện thoại để bắt đầu lắc!',
    'step2.https_note': '(Lưu ý: Tính năng lắc thiết bị yêu cầu giao thức bảo mật HTTPS khi chạy trên trình duyệt di động)',
    'step2.btn_reveal': 'Xem Luận Giải Chi Tiết',

    // Step 3: Kết quả
    'step3.indicator': 'Bước 3: Nhận Luận Giải',
    'step3.title': 'Thẻ Xăm Của Bạn',
    'step3.wish_label': 'Ý nguyện:',
    'step3.wish_default': 'Cầu bình an...',
    'step3.instant_title': 'Lời Khuyên Tức Thì',
    'step3.poem_title': 'Thơ Thần (Chữ Hán Việt)',
    'step3.translation_title': 'Dịch Nghĩa',
    'step3.meaning_title': 'Ý Nghĩa Chung',
    'step3.details_title': 'Luận Giải Chi Tiết',
    'step3.seal_1': 'Linh Quẻ',
    'step3.seal_2': 'Cát Tường',
    'step3.btn_details': 'Xem Bảng Luận Giải',
    'step3.btn_save': 'Lưu Ảnh Quẻ Xăm',
    'step3.btn_new': 'Gieo Quẻ Mới',
    'step3.modal_title': 'Bản Luận Giải Chi Tiết',

    // Meditation
    'meditation.indicator': 'Không gian tịnh tâm',
    'meditation.title': 'Thắp Hương Gõ Mõ',
    'meditation.desc': 'Thắp một nén nhang, dâng hoa tươi lên ban thờ và gõ mõ tụng kinh giúp tâm hồn thanh tịnh, tập trung và tích lũy công đức cát lành.',
    'meditation.flower_label': 'Dâng Hoa',
    'meditation.time_label': 'Thời gian thắp hương:',
    'meditation.time_unit': 'phút',
    'meditation.music_label': 'Chọn nhạc nền tịnh tâm:',
    'meditation.music_meditation': '🧘 Thiền Định Tịnh Tâm',
    'meditation.music_bowl': '🔔 Chuông Xoay Tây Tạng',
    'meditation.music_flute': '🎵 Nhạc Sáo Trúc Du Dương',
    'meditation.music_none': '🔇 Tắt Nhạc Nền',
    'meditation.btn_light': 'Thắp Hương Nhang',
    'meditation.btn_extinguish': 'Dập Hương Nhang',
    'meditation.btn_flower': 'Dâng Hoa Sen',
    'meditation.btn_flower_back': 'Thu Hoa Sen Về',
    'meditation.btn_flower_gold': 'Dâng Hoa Sen Vàng',
    'meditation.mo_title': '🪘 Gõ Mõ Tích Đức',
    'meditation.mo_desc': '(Nhấp vào mõ gỗ để tụng kinh tích đức)',
    'meditation.merit_label': 'Công Đức Tích Lũy:',
    'meditation.merit_float': '+1 Công Đức',

    // Footer
    'footer.copyright': '© 2026 Xăm Linh Quẻ Thánh Mẫu - Vạn sự tùy duyên',
    'footer.visits': '🌸 Số lượt ghé khấn:',

    // Sound
    'sound.title': 'Bật/Tắt âm thanh',

    // Dynamic Messages
    'msg.keo_success': 'Nhất Âm Nhất Dương (Sấp - Ngửa)!',
    'msg.keo_success_sub': 'Thần Phật đồng ý. Hãy lắc ống xăm.',
    'msg.keo_sap_sap': 'Keo Sấp - Sấp (Kiêu bôi - Cười)!',
    'msg.keo_sap_sap_sub': 'Thần Phật chưa rõ ý nguyện. Hãy gieo lại.',
    'msg.keo_ngua_ngua': 'Keo Ngửa - Ngửa (Âm bôi - Đổ)!',
    'msg.keo_ngua_ngua_sub': 'Thần Phật giận/không thuận. Hãy gieo lại.',
    'msg.keo_locked': 'Bạn đang bị tạm khóa do gieo keo bất thành 3 lần.',
    'msg.keo_fail_3': 'Xin keo bất thành 3 lần. Vui lòng thử lại sau.',
    'msg.keo_reset': "Hãy thành tâm khấn nguyện trong tâm rồi nhấn 'Gieo Keo'.",
    'msg.keo_unlocked': "Hãy nhấn 'Gieo Keo' bên dưới.",
    'msg.stick_fallen': 'Thẻ xăm đã rơi ra! Nhấn nút để xem.',
    'msg.wish_default': 'Thành tâm khấn nguyện',

    // Instant Advice
    'advice.supreme': 'THƯỢNG THƯỢNG (ĐẠI CÁT)',
    'advice.supreme_note': 'Xăm Đại Cát: Mọi việc hanh thông cực thịnh, cầu được ước thấy, cát tường như ý.',
    'advice.good': 'THƯỢNG CÁT (TỐT LÀNH)',
    'advice.good_note': 'Xăm Tốt: Thời vận hanh thông, công danh rạng rỡ, mọi việc suôn sẻ khởi sắc.',
    'advice.fair_good': 'TRUNG CÁT (KHÁ TỐT)',
    'advice.fair_good_note': 'Xăm Khá: Vận khí đang lên, gặp nhiều cơ hội tốt, nhân duyên thuận hòa.',
    'advice.average': 'TRUNG BÌNH (BÌNH HÒA)',
    'advice.average_note': 'Xăm Bình Hòa: Vận thế ổn định, không nên thay đổi lớn hay mạo hiểm, tĩnh thủ là hơn.',
    'advice.below': 'HẠ CÁT (HƠI XẤU)',
    'advice.below_note': 'Xăm Hơi Xấu: Có chút khó khăn, chướng ngại cản lối, làm việc cần nhẫn nại, cẩn trọng.',
    'advice.bad': 'HẠ HẠ (ĐẠI HUNG)',
    'advice.bad_note': 'Xăm Xấu: Vận hạn cản lối, thị phi trắc trở, mọi việc cần hết sức cẩn trọng, đề phòng rủi ro.',

    // Toast Messages
    'toast.save_success': 'Đã lưu ảnh quẻ xăm thành công!',
    'toast.save_error': 'Không thể lưu ảnh tự động. Xin hãy thử lại trên trình duyệt khác hoặc chụp ảnh màn hình.',
    'toast.incense_done': 'Nén hương đã tàn. Tịnh tâm viên mãn!',
    'toast.incense_off': 'Đã dập tắt nén hương.',
    'toast.flower_on': 'Đã dâng hoa sen thanh khiết lên ban thờ!',
    'toast.flower_off': 'Đã thu hồi hoa sen.',

    // Canvas Export
    'canvas.header': 'XĂM LINH QUẺ THÁNH MẪU',
    'canvas.subheader': 'Chân thành cầu nguyện - Hanh thông cát tường',
    'canvas.pilgrim': '« Vạn sự tùy duyên - Thành tâm khấn nguyện »',
    'canvas.instant_title': 'LỜI KHUYÊN TỨC THÌ',
    'canvas.poem_title': 'THƠ THẦN',
    'canvas.trans_title': 'DỊCH NGHĨA',
    'canvas.meaning_title': 'Ý NGHĨA CHUNG:',
    'canvas.details_title': 'CHI TIẾT LUẬN GIẢI:',
    'canvas.seal_1': 'LINH QUẺ',
    'canvas.seal_2': 'CÁT TƯỜNG',

    // Detail Categories
    'detail.self': 'Bản thân',
    'detail.home': 'Gia trạch',
    'detail.plans': 'Mưu sự',
    'detail.wealth': 'Cầu tài',
    'detail.health': 'Tật bệnh',
    'detail.marriage': 'Hôn nhân',
    'detail.travel': 'Xuất hành',

    // Kinh Dịch Divination
    'kinhdich.indicator_step1': 'Kinh Dịch Linh Ứng',
    'kinhdich.title': 'Gieo Quẻ Kinh Dịch',
    'kinhdich.desc': 'Chu Dịch thần diệu có thể chỉ dẫn cho bạn mọi nghi ngờ trong cuộc sống. Hãy nhắm mắt, tĩnh tâm và tập trung nghĩ về câu hỏi của bạn.',
    'kinhdich.question_label': 'Câu hỏi hoặc sự việc cần chiêm bốc:',
    'kinhdich.question_placeholder': 'Ví dụ: Công danh sự nghiệp năm nay thế nào...',
    'kinhdich.btn_start': 'Bắt Đầu Gieo Quẻ',
    'kinhdich.mode_sequential': 'Gieo Từng Hào',
    'kinhdich.mode_sequential_desc': 'Lắc xu 6 lần từ dưới lên trên để chiêm nghiệm tiến trình.',
    'kinhdich.mode_instant': 'Gieo Nhanh 6 Hào',
    'kinhdich.mode_instant_desc': 'Lắc xu 1 lần duy nhất để gieo cùng lúc toàn bộ 6 hào.',
    'kinhdich.btn_shake_instant': 'Lắc Xu Gieo Toàn Quẻ',
    'kinhdich.coins_instant_complete': 'Đã gieo cùng lúc 6 hào thành công!',
    'kinhdich.biendich_title': '☯️ Lý Giải Sự Biến Quẻ',
    'kinhdich.indicator_step2': 'Tiến trình gieo quẻ',
    'kinhdich.cast_title': 'Thành Tâm Gieo 3 Đồng Xu',
    'kinhdich.cast_desc': 'Nhấp vào đĩa hoặc bấm nút bên dưới để gieo 3 đồng xu. Bạn sẽ gieo tổng cộng 6 lần để dựng nên 6 hào (từ dưới lên trên).',
    'kinhdich.step_label': 'Lần gieo:',
    'kinhdich.coins_init': 'Nhấn gieo để lắc xu',
    'kinhdich.hao_6': 'Hào 6',
    'kinhdich.hao_5': 'Hào 5',
    'kinhdich.hao_4': 'Hào 4',
    'kinhdich.hao_3': 'Hào 3',
    'kinhdich.hao_2': 'Hào 2',
    'kinhdich.hao_1': 'Hào 1',
    'kinhdich.btn_shake': 'Gieo Hào 1',
    'kinhdich.indicator_step3': 'Ý nghĩa quẻ dịch',
    'kinhdich.result_title': 'Kết Quả Chiêm Bốc',
    'kinhdich.result_question': 'Câu hỏi của bạn:',
    'kinhdich.primary_role': 'Quẻ Chủ (Hiện Tại)',
    'kinhdich.secondary_role': 'Quẻ Biến (Tương Lai)',
    'kinhdich.changing_text': 'Biến',
    'kinhdich.changing_lines_title': 'Luận Giải Chi Tiết Các Hào Động',
    'kinhdich.cat_career': 'Sự nghiệp & Công danh',
    'kinhdich.cat_love': 'Tình duyên & Gia đạo',
    'kinhdich.cat_wealth': 'Tài lộc & Tiền bạc',
    'kinhdich.cat_health': 'Sức khỏe & Sinh lực',
    'kinhdich.btn_save': 'Lưu Ảnh Quẻ Dịch',
    'kinhdich.btn_new': 'Gieo Quẻ Mới',
    'toast.kd_save_success': 'Đã lưu ảnh quẻ dịch thành công!',
    'toast.kd_shaking': 'Đang lắc đồng xu...',
    'toast.kd_complete': 'Đã lập xong quẻ dịch!',
    'msg.kd_three_heads': '3 Ngửa (Lão Dương - Hào Dương Động ━━o━━)',
    'msg.kd_three_tails': '3 Sấp (Lão Âm - Hào Âm Động ━━x━━)',
    'msg.kd_two_heads_one_tail': '2 Ngửa, 1 Sấp (Thiếu Âm - Hào Âm ━━ ━━)',
    'msg.kd_one_heads_two_tails': '1 Ngửa, 2 Sấp (Thiếu Dương - Hào Dương ━━━━━)'
  },

  en: {
    // Header
    'header.title': 'Fortune Stick Oracle',
    'header.subtitle': 'Pray with Sincerity — Blessings Shall Follow',

    // Navigation
    'nav.fortune': '⛩️ Draw Fortune Sticks',
    'nav.kinhdich': '☯️ I Ching Divination',
    'nav.meditation': '🌸 Temple Meditation',

    // Step 1: Cast Moon Blocks
    'step1.indicator': 'Step 1: Cast the Moon Blocks',
    'step1.title': 'Cast the Divine Moon Blocks',
    'step1.desc_html': 'Before casting, please close your eyes and meditate, <strong>sincerely pray in your heart</strong> (your name, age, and question). Then choose the interpretation mode and press <strong>Cast Blocks</strong> (You need 1 Flat - 1 Round, maximum 3 attempts).',
    'step1.mode_label': 'Interpretation mode:',
    'step1.mode_full_title': 'Full Interpretation',
    'step1.mode_full_desc': 'Sacred poem, translation, and life aspects.',
    'step1.mode_instant_title': 'Instant Advice',
    'step1.mode_instant_desc': 'Fortune type with brief guidance.',
    'step1.block_title': 'Cannot Draw Fortune Yet',
    'step1.block_desc': 'You have failed all 3 casting attempts. Please wait sincerely for another opportunity.',
    'step1.block_comeback': 'Come back after 30 minutes to pray again.',
    'step1.keo_ngua': 'Round (Yang)',
    'step1.keo_sap': 'Flat (Yin)',
    'step1.keo_default_msg': 'Press "Cast Blocks" below.',
    'step1.btn_toss': 'Cast Moon Blocks',
    'step1.btn_next': 'Proceed to Shake Sticks',

    // Step 2: Shake Fortune Tube
    'step2.indicator': 'Step 2: Shake the Stick Tube',
    'step2.title': 'Shake the Fortune Tube',
    'step2.desc': 'Click or tap the fortune tube **more than 10 times** to accumulate spiritual energy and reveal the fortune stick.',
    'step2.shake_label': 'Sincere shakes:',
    'step2.shake_unit': 'times',
    'step2.tube_label': 'SACRED<br>ORACLE',
    'step2.instruction': 'Click/Tap the tube or shake your phone to start!',
    'step2.https_note': '(Note: Device shake feature requires HTTPS protocol on mobile browsers)',
    'step2.btn_reveal': 'View Detailed Interpretation',

    // Step 3: Result
    'step3.indicator': 'Step 3: Receive Interpretation',
    'step3.title': 'Your Fortune Stick',
    'step3.wish_label': 'Your wish:',
    'step3.wish_default': 'Pray for peace...',
    'step3.instant_title': 'Instant Advice',
    'step3.poem_title': 'Sacred Poem (Sino-Vietnamese)',
    'step3.translation_title': 'Translation',
    'step3.meaning_title': 'General Meaning',
    'step3.details_title': 'Detailed Interpretation',
    'step3.seal_1': 'Sacred',
    'step3.seal_2': 'Fortune',
    'step3.btn_details': 'View Interpretation Table',
    'step3.btn_save': 'Save Fortune Image',
    'step3.btn_new': 'Draw New Fortune',
    'step3.modal_title': 'Detailed Interpretation Sheet',

    // Meditation
    'meditation.indicator': 'Meditation Space',
    'meditation.title': 'Light Incense & Strike Mokugyo',
    'meditation.desc': 'Light a stick of incense, offer fresh flowers at the altar, and strike the wooden fish to purify your soul, focus your mind, and accumulate merit.',
    'meditation.flower_label': 'Offer Flowers',
    'meditation.time_label': 'Incense burning time:',
    'meditation.time_unit': 'min',
    'meditation.music_label': 'Select meditation music:',
    'meditation.music_meditation': '🧘 Meditation & Mindfulness',
    'meditation.music_bowl': '🔔 Tibetan Singing Bowl',
    'meditation.music_flute': '🎵 Melodious Bamboo Flute',
    'meditation.music_none': '🔇 Mute Background Music',
    'meditation.btn_light': 'Light Incense Stick',
    'meditation.btn_extinguish': 'Extinguish Incense',
    'meditation.btn_flower': 'Offer Lotus Flowers',
    'meditation.btn_flower_back': 'Withdraw Lotus Flowers',
    'meditation.btn_flower_gold': 'Offer Golden Lotus',
    'meditation.mo_title': '🪘 Strike Mokugyo for Merit',
    'meditation.mo_desc': '(Click the wooden fish to chant and accumulate merit)',
    'meditation.merit_label': 'Accumulated Merit:',
    'meditation.merit_float': '+1 Merit',

    // Footer
    'footer.copyright': '© 2026 Sacred Oracle of the Holy Mother — All by Destiny',
    'footer.visits': '🌸 Prayer visits:',

    // Sound
    'sound.title': 'Toggle Sound',

    // Dynamic Messages
    'msg.keo_success': 'One Yin, One Yang (Flat - Round)!',
    'msg.keo_success_sub': 'The Divine has approved. Shake the fortune tube.',
    'msg.keo_sap_sap': 'Both Flat (Laughing Blocks)!',
    'msg.keo_sap_sap_sub': 'The Divine is unclear of your wish. Cast again.',
    'msg.keo_ngua_ngua': 'Both Round (Angry Blocks)!',
    'msg.keo_ngua_ngua_sub': 'The Divine is displeased. Cast again.',
    'msg.keo_locked': 'You are temporarily locked after 3 failed casting attempts.',
    'msg.keo_fail_3': '3 failed attempts. Please try again later.',
    'msg.keo_reset': "Pray sincerely in your heart, then press 'Cast Blocks'.",
    'msg.keo_unlocked': "Press 'Cast Blocks' below.",
    'msg.stick_fallen': 'A fortune stick has fallen out! Press the button to view.',
    'msg.wish_default': 'Sincere prayer',

    // Instant Advice
    'advice.supreme': 'SUPREME FORTUNE (MOST AUSPICIOUS)',
    'advice.supreme_note': 'Supreme Fortune: All endeavors shall prosper greatly. Wishes fulfilled, blessings abound.',
    'advice.good': 'GREAT FORTUNE (AUSPICIOUS)',
    'advice.good_note': 'Great Fortune: Favorable times ahead. Career shines bright, all matters improve.',
    'advice.fair_good': 'GOOD FORTUNE (FAVORABLE)',
    'advice.fair_good_note': 'Good Fortune: Luck is rising with good opportunities. Harmonious relationships.',
    'advice.average': 'AVERAGE (NEUTRAL)',
    'advice.average_note': 'Neutral: Stable fortune. Avoid major changes or risks. Staying steady is best.',
    'advice.below': 'BELOW AVERAGE (SLIGHTLY UNFAVORABLE)',
    'advice.below_note': 'Slightly Unfavorable: Some difficulties and obstacles ahead. Patience and caution needed.',
    'advice.bad': 'MISFORTUNE (INAUSPICIOUS)',
    'advice.bad_note': 'Misfortune: Bad luck blocks your path. Disputes and obstacles abound. Exercise extreme caution.',

    // Toast Messages
    'toast.save_success': 'Fortune image saved successfully!',
    'toast.save_error': 'Cannot save image automatically. Please try another browser or take a screenshot.',
    'toast.incense_done': 'The incense has burned out. Meditation complete!',
    'toast.incense_off': 'Incense extinguished.',
    'toast.flower_on': 'Pure lotus flowers offered at the altar!',
    'toast.flower_off': 'Lotus flowers withdrawn.',

    // Canvas Export
    'canvas.header': 'SACRED FORTUNE ORACLE',
    'canvas.subheader': 'Pray with Sincerity — Blessings Abound',
    'canvas.pilgrim': '« All by Destiny — Pray with Sincerity »',
    'canvas.instant_title': 'INSTANT ADVICE',
    'canvas.poem_title': 'SACRED POEM',
    'canvas.trans_title': 'TRANSLATION',
    'canvas.meaning_title': 'GENERAL MEANING:',
    'canvas.details_title': 'DETAILED INTERPRETATION:',
    'canvas.seal_1': 'SACRED',
    'canvas.seal_2': 'FORTUNE',

    // Detail Categories
    'detail.self': 'Personal',
    'detail.home': 'Home & Family',
    'detail.plans': 'Plans & Career',
    'detail.wealth': 'Wealth',
    'detail.health': 'Health',
    'detail.marriage': 'Marriage',
    'detail.travel': 'Travel',

    // I Ching Divination
    'kinhdich.indicator_step1': 'I Ching Revelation',
    'kinhdich.title': 'I Ching Divination',
    'kinhdich.desc': 'The divine I Ching can guide you through any doubts in life. Close your eyes, calm your mind, and focus on your question.',
    'kinhdich.question_label': 'Your question or matter to ask:',
    'kinhdich.question_placeholder': 'Example: How will my career progress this year...',
    'kinhdich.btn_start': 'Start Divination',
    'kinhdich.mode_sequential': 'Sequential Cast',
    'kinhdich.mode_sequential_desc': 'Shake 3 coins 6 times bottom-up to build the hexagram step-by-step.',
    'kinhdich.mode_instant': 'Instant Cast',
    'kinhdich.mode_instant_desc': 'Shake once to cast all 6 lines of the hexagram at the same time.',
    'kinhdich.btn_shake_instant': 'Shake Coins for All Lines',
    'kinhdich.coins_instant_complete': 'All 6 lines successfully cast at once!',
    'kinhdich.biendich_title': '☯️ Understanding the Hexagram Mutation',
    'kinhdich.indicator_step2': 'Casting Progress',
    'kinhdich.cast_title': 'Sincerely Cast 3 Coins',
    'kinhdich.cast_desc': 'Click on the plate or press the button below to toss 3 coins. You will cast 6 times to build the 6 lines (bottom to top).',
    'kinhdich.step_label': 'Cast count:',
    'kinhdich.coins_init': 'Press button to shake coins',
    'kinhdich.hao_6': 'Line 6',
    'kinhdich.hao_5': 'Line 5',
    'kinhdich.hao_4': 'Line 4',
    'kinhdich.hao_3': 'Line 3',
    'kinhdich.hao_2': 'Line 2',
    'kinhdich.hao_1': 'Line 1',
    'kinhdich.btn_shake': 'Cast Line 1',
    'kinhdich.indicator_step3': 'Hexagram Meaning',
    'kinhdich.result_title': 'Divination Results',
    'kinhdich.result_question': 'Your question:',
    'kinhdich.primary_role': 'Primary Hexagram (Present)',
    'kinhdich.secondary_role': 'Secondary Hexagram (Future)',
    'kinhdich.changing_text': 'Changes to',
    'kinhdich.changing_lines_title': 'Detailed Changing Lines Interpretation',
    'kinhdich.cat_career': 'Plans & Career',
    'kinhdich.cat_love': 'Love & Relationships',
    'kinhdich.cat_wealth': 'Wealth & Finance',
    'kinhdich.cat_health': 'Health & Vitality',
    'kinhdich.btn_save': 'Save Hexagram Image',
    'kinhdich.btn_new': 'New Divination',
    'toast.kd_save_success': 'Hexagram image saved successfully!',
    'toast.kd_shaking': 'Shaking coins...',
    'toast.kd_complete': 'Hexagram casting complete!',
    'msg.kd_three_heads': '3 Heads (Moving Yang ━━o━━)',
    'msg.kd_three_tails': '3 Tails (Moving Yin ━━x━━)',
    'msg.kd_two_heads_one_tail': '2 Heads, 1 Tail (Static Yin ━━ ━━)',
    'msg.kd_one_heads_two_tails': '1 Head, 2 Tails (Static Yang ━━━━━)'
  }
};

// ── Core i18n Functions ──────────────────────────────────────────────

// Current language (read from localStorage, default 'vi')
let currentLang = localStorage.getItem('xin_xam_lang') || 'vi';

// Get translated string by key
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || TRANSLATIONS['vi'][key]
    || key;
}

// Get current language
function getLang() {
  return currentLang;
}

// Set language and persist to localStorage
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('xin_xam_lang', lang);
  document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
  applyLanguage();
}

// Toggle between Vietnamese and English
function toggleLang() {
  setLang(currentLang === 'vi' ? 'en' : 'vi');
}

// Apply current language to all elements with data-i18n attribute
function applyLanguage() {
  // Update static elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var translated = t(key);
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = translated;
    } else {
      el.textContent = translated;
    }
  });

  // Update title attribute elements
  document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });

  // Update placeholder attribute elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Update language toggle button label
  var langLabel = document.getElementById('lang-label');
  if (langLabel) {
    langLabel.textContent = currentLang === 'vi' ? 'VI' : 'EN';
  }

  // Dispatch custom event so app.js can update dynamic content
  window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: currentLang } }));
}

// Detail category key mapping (Vietnamese key name → i18n key)
var DETAIL_KEY_MAP = {
  'Bản thân': 'detail.self',
  'Gia trạch': 'detail.home',
  'Mưu sự': 'detail.plans',
  'Cầu tài': 'detail.wealth',
  'Tật bệnh': 'detail.health',
  'Hôn nhân': 'detail.marriage',
  'Xuất hành': 'detail.travel'
};

// Helper: get the localized detail category name
function getDetailLabel(viKey) {
  var i18nKey = DETAIL_KEY_MAP[viKey];
  return i18nKey ? t(i18nKey) : viKey;
}

// Initialize document language on load
document.documentElement.lang = currentLang === 'vi' ? 'vi' : 'en';
