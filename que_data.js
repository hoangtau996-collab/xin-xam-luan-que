const QUE_DATA = [
  {
    id: 1,
    name: "Quẻ Số 1 - Thượng Thượng (Đại Cát)",
    title: "Khai Hoa Kết Quả",
    poem: "Khai hoa kết quả tự nhiên thành\nY bối huỳnh kim bộ ngọc đình\nĐông tây nam bắc giai thông đạt\nVạn sự hanh thông đắc thái bình.",
    translation: "Hoa nở kết quả tự nhiên thành,\nÁo mặc vàng ròng, bước điện ngọc.\nĐông tây nam bắc đều thông đạt,\nVạn sự hanh thông đắc thái bình.",
    meaning: "Mọi sự cát tường, cầu tài đắc tài, cầu danh đắc danh, gia đạo bình an vô sự. Thời cơ chín muồi, hành sự như ý.",
    details: {
      "Bản thân": "Bản mệnh vững vàng, vận thế cực thịnh, có quý nhân phù trợ từ nhiều phương.",
      "Gia trạch": "Gia môn hưng vượng, gia đình hòa thuận, có tin vui về người hoặc thêm của.",
      "Mưu sự": "Mọi việc dự định đều thành công dễ dàng, không gặp trở ngại.",
      "Cầu tài": "Tài lộc dồi dào, kinh doanh đắc lợi, đầu tư sinh lời lớn.",
      "Tật bệnh": "Sức khỏe dồi dào, nếu đang có bệnh sẽ nhanh chóng bình phục.",
      "Hôn nhân": "Lương duyên tiền định, gia đạo hạnh phúc viên mãn.",
      "Xuất hành": "Đi xa thuận lợi, có bạn hiền giúp đỡ, hướng đông nam cát tường."
    }
  },
  {
    id: 2,
    name: "Quẻ Số 2 - Thượng Cát",
    title: "Xuân Hoa Thu Cúc",
    poem: "Thu cúc xuân hoa mỗi tự vinh\nThời lai vận chuyển cát nhân tinh\nKim ngân tài bảo trùng trùng chí\nĐộc bộ phong vân lập đại danh.",
    translation: "Cúc thu hoa xuân mỗi thứ tự tươi tốt,\nThời tới vận chuyển nhờ sao lành chiếu mệnh.\nVàng bạc tài bảo trùng trùng đưa tới,\nMột mình bước lên gió mây lập công danh lớn.",
    meaning: "Mọi sự thuận lợi, thời vận hanh thông, công danh rạng rỡ. Vạn sự khởi đầu tuy chậm nhưng kết quả mỹ mãn.",
    details: {
      "Bản thân": "Bản thân an vui, tinh thần phấn chấn, gặp nhiều may mắn bất ngờ.",
      "Gia trạch": "Gia đạo yên vui, trong nhà có hỷ sự, con cháu hiếu thảo học hành đỗ đạt.",
      "Mưu sự": "Gặp thời vận tốt, mưu sự ắt thành nhưng cần kiên nhẫn đợi đúng thời cơ.",
      "Cầu tài": "Tài lộc hanh thông, mua bán có duyên, tiền bạc dư dả.",
      "Tật bệnh": "Không có bệnh tật gì lớn, cơ thể tráng kiện.",
      "Hôn nhân": "Duyên lành tự đến, vợ chồng hòa hợp, trăm năm hạnh phúc.",
      "Xuất hành": "Xuất hành hướng Nam hoặc Đông rất có lợi cho danh tiếng và tiền tài."
    }
  },
  {
    id: 3,
    name: "Quẻ Số 3 - Trung Bình",
    title: "Thuận Thủy Hành Chu",
    poem: "Phong điềm lãng tịnh khả phi thuyền\nVạn lý ba đào nhậm tự nhiên\nTĩnh thủ gia môn vô sự động\nTùy cơ ứng biến cát vô biên.",
    translation: "Gió lặng sóng êm có thể thả thuyền,\nVạn dặm sóng gió cứ để tự nhiên.\nYên lặng giữ gia môn, chớ động đậy,\nTùy cơ ứng biến tốt lành khôn cùng.",
    meaning: "Bình thường ổn định, không nên thay đổi lớn hay đầu tư mạo hiểm. Giữ nguyên trạng cũ sẽ an toàn và cát lành.",
    details: {
      "Bản thân": "Tâm tính bình hòa, không nên tham lam hay nóng vội mà hỏng việc.",
      "Gia trạch": "Gia đạo bình an, cuộc sống ổn định, tránh tranh chấp cãi cọ.",
      "Mưu sự": "Mưu sự trung bình, không nên mở rộng quy mô lớn, làm việc cũ thì tốt.",
      "Cầu tài": "Tài lộc vừa đủ dùng, không có tài lộc lớn nhưng cũng không lo thiếu thốn.",
      "Tật bệnh": "Bệnh nhẹ sớm khỏi, nên chú ý nghỉ ngơi và ăn uống điều độ.",
      "Hôn nhân": "Tình duyên bình thường, cần bao dung thấu hiểu nhau hơn.",
      "Xuất hành": "Chỉ nên đi xa khi thật sự cần thiết, đi gần thì an toàn hơn."
    }
  },
  {
    id: 4,
    name: "Quẻ Số 4 - Hạ Hạ",
    title: "Vũ Bạt Phong Cuồng",
    poem: "Phong cuồng vũ bạo vũ khuynh sào\nBộ bộ kinh tâm lộ cách đào\nTẩu bích phi sa đa trướng ngại\nTạm nghi thủ cựu lánh ba đào.",
    translation: "Gió cuồng mưa dữ làm đổ tổ chim,\nMỗi bước giật mình đường đi đầy sóng lớn.\nĐá bay cát chạy nhiều chướng ngại,\nTạm nên giữ cũ để lánh sóng gió.",
    meaning: "Vận thế gặp nhiều trắc trở, gian nan, dễ gặp thị phi hoặc tổn thất. Cần ẩn nhẫn, không tiến hành việc lớn.",
    details: {
      "Bản thân": "Bản mệnh yếu, đề phòng tiểu nhân hãm hại, thị phi vây quanh.",
      "Gia trạch": "Trong nhà bất hòa, đề phòng trộm cắp, mất mát của cải.",
      "Mưu sự": "Khó thành công, dự án dễ bị đình trệ hoặc đổ vỡ, nên hoãn lại.",
      "Cầu tài": "Tài lộc suy kiệt, dễ hao tài tốn của, tuyệt đối tránh cho vay mượn.",
      "Tật bệnh": "Chú ý bệnh nặng, phòng ngừa tai nạn bất ngờ, nên tích cực đi khám.",
      "Hôn nhân": "Nhiều trắc trở, xung đột gay gắt, dễ dẫn đến chia ly.",
      "Xuất hành": "Không nên đi xa, dễ gặp hiểm nguy dọc đường hoặc trễ nải sự việc."
    }
  },
  {
    id: 5,
    name: "Quẻ Số 5 - Hạ Cát",
    title: "Khổ Tận Cam Lai",
    poem: "Khổ tận cam lai sự tự thành\nNhất trùng vân khải nhất trùng thanh\nLịch tận gian nan quân tu ký\nKim triều đắc ý bộ bồng doanh.",
    translation: "Hết khổ tới sướng việc tự thành,\nMột tầng mây mở ra một tầng trời trong xanh.\nTrải hết gian nan người nên nhớ,\nSáng nay đắc ý bước lên chốn bồng lai.",
    meaning: "Tiền cát hậu hung, ban đầu gặp nhiều gian truân thử thách nhưng kiên trì đến cùng sẽ đạt được thành quả ngọt ngào.",
    details: {
      "Bản thân": "Trải qua thử thách giúp bản thân trưởng thành, vận khí dần dần tốt lên.",
      "Gia trạch": "Gia đạo ban đầu có chút bất hòa, sau đó mọi người thấu hiểu và đùm bọc nhau.",
      "Mưu sự": "Gặp nhiều trở ngại lúc đầu, kiên trì không bỏ cuộc chắc chắn sẽ thành.",
      "Cầu tài": "Tiền tài tích lũy từ từ, ban đầu khó khăn nhưng về sau khấm khá.",
      "Tật bệnh": "Bệnh tật dai dẳng nhưng gặp thầy gặp thuốc sẽ khỏi hoàn toàn.",
      "Hôn nhân": "Trải qua sóng gió thử thách mới đến được với nhau, tình cảm bền chặt.",
      "Xuất hành": "Ban đầu đi xa có chút trục trặc, sau đó mọi việc suôn sẻ thuận lợi."
    }
  },
  {
    id: 6,
    name: "Quẻ Số 6 - Trung Cát",
    title: "Nhân Duyên Hòa Hợp",
    poem: "Nhân duyên hòa hợp sự giai thông\nMộc dục xuân phong kiến thái hồng\nHỷ tín trùng phùng tăng phước lộc\nGia môn hòa khí tự hưng long.",
    translation: "Nhân duyên hòa hợp mọi việc đều thông suốt,\nTắm mát trong gió xuân nhìn thấy cầu vồng đẹp.\nTin vui gặp lại tăng thêm phước lộc,\nGia môn hòa thuận tự nhiên hưng thịnh.",
    meaning: "Mọi sự tiến triển tốt đẹp nhờ sự hòa hợp và giúp đỡ của những người xung quanh. Gia đạo yên vui, công việc thuận lợi.",
    details: {
      "Bản thân": "Được mọi người yêu mến, nhân duyên tốt đẹp, tâm tình vui vẻ cát tường.",
      "Gia trạch": "Gia đạo yên vui, vợ chồng hòa thuận, có bạn bè tốt ghé thăm.",
      "Mưu sự": "Nên hợp tác làm ăn, hợp tác sẽ thành công lớn hơn làm một mình.",
      "Cầu tài": "Tài lộc khá tốt, tiền của đến từ các mối quan hệ hợp tác uy tín.",
      "Tật bệnh": "Sức khỏe ổn định, tinh thần sảng khoái giúp bệnh tật tiêu tan.",
      "Hôn nhân": "Nhân duyên rất tốt, đôi bên xứng lứa vừa đôi, sớm kết lương duyên.",
      "Xuất hành": "Xuất hành kết giao bạn bè hoặc gặp gỡ đối tác vô cùng thuận lợi."
    }
  },
  {
    id: 7,
    name: "Quẻ Số 7 - Thượng Thượng",
    title: "Vân Khai Kiến Nhật",
    poem: "Nhất phiến vân khai kiến thái dương\nVạn vật sinh huy chiếu tứ phương\nTự cổ nguy hiểm chung quá khứ\nKim triều hoạch cát đại cát tường.",
    translation: "Một áng mây mở nhìn thấy mặt trời,\nVạn vật tỏa sáng chiếu khắp ấm bốn phương.\nTự cổ hiểm nguy rồi cũng qua đi,\nHôm nay nhận được điều lành, đại cát tường.",
    meaning: "Thời kỳ đen tối trắc trở đã qua, vận hội mới rực rỡ đã tới. Mọi việc bắt đầu phát triển cực kỳ mạnh mẽ.",
    details: {
      "Bản thân": "Vận khí bừng sáng, tai qua nạn khỏi, danh tiếng vang xa.",
      "Gia trạch": "Gia đạo gặp nhiều may mắn, giải quyết được các hiểu lầm tích tụ lâu nay.",
      "Mưu sự": "Gặp cơ hội vàng, hành động ngay lập tức sẽ đạt thành tựu đột phá.",
      "Cầu tài": "Tài lộc dồi dào, tiền bạc tự chảy vào túi, cơ hội trúng số hoặc thưởng lớn.",
      "Tật bệnh": "Bệnh nặng chuyển nhẹ, bệnh nhẹ tiêu trừ, cơ thể hồi phục nhanh chóng.",
      "Hôn nhân": "Tình duyên đơm hoa kết trái, đón hỷ sự lâm môn.",
      "Xuất hành": "Xuất hành đại cát, đi về hướng Đông hoặc hướng Nam có tài lộc lớn."
    }
  },
  {
    id: 8,
    name: "Quẻ Số 8 - Hạ Hạ",
    title: "Hổ Lạc Bình Dương",
    poem: "Hổ lạc bình dương bị khuyển khi\nAnh hùng vô thế lẫm nan quy\nThời bất ngã dữ đa phòng hoạn\nTĩnh thủ duy trì tiệm khả vi.",
    translation: "Cọp xuống đồng bằng bị chó khinh,\nAnh hùng mất thế khó quay về.\nThời không đợi ta, nên phòng họa,\nYên lặng giữ mình, đợi cơ hội sau.",
    meaning: "Đang ở thế yếu, không có thời cơ thích hợp, dễ bị người dưới vượt mặt hoặc bắt chẹt. Đòi hỏi sự nhẫn nại cao độ.",
    details: {
      "Bản thân": "Bị hạn chế tài năng, đề phòng thị phi tai tiếng, hạn chế tranh cãi.",
      "Gia trạch": "Gia đạo bất an, có xáo trộn nhỏ, đề phòng người ngoài gây chia rẽ.",
      "Mưu sự": "Chưa phải lúc thực hiện dự án mới, nên học hỏi thêm và giữ vững việc cũ.",
      "Cầu tài": "Không có tài lộc, dễ bị lừa gạt mất mát, hạn chế đầu tư rủi ro cao.",
      "Tật bệnh": "Cần cẩn thận các bệnh về xương khớp hoặc hô hấp, đề phòng té ngã.",
      "Hôn nhân": "Tình cảm rạn nứt do thiếu tin tưởng, dễ xảy ra cự cãi tranh chấp.",
      "Xuất hành": "Tránh đi xa, dễ gặp bất lợi về giấy tờ hoặc gặp kẻ xấu phá hoại."
    }
  },
  {
    id: 9,
    name: "Quẻ Số 9 - Trung Bình",
    title: "Nguyệt Lão Đàm Tâm",
    poem: "Vân tiêu vụ tán nguyệt trùng minh\nTự nhiên chiếu đắc thế nhân tinh\nĐộc bộ hàn giang tuy cô độc\nChung hữu quý nhân chỉ lộ trình.",
    translation: "Mây tan sương tạnh trăng lại sáng,\nTự nhiên soi tỏ khắp thế gian.\nMột mình qua sông lạnh tuy cô độc,\nCuối cùng vẫn có quý nhân chỉ đường đi.",
    meaning: "Giai đoạn chuyển giao từ khó khăn sang thuận lợi. Dù hiện tại có chút đơn độc nhưng sẽ sớm gặp được người giúp đỡ.",
    details: {
      "Bản thân": "Tâm trí sáng suốt, tự tìm ra lối thoát cho bản thân sau chuỗi ngày bế tắc.",
      "Gia trạch": "Gia đạo yên ổn, mọi xích mích nhỏ đều được hòa giải êm đẹp.",
      "Mưu sự": "Mở rộng kinh doanh cần thận trọng, tự lực cánh sinh là chính.",
      "Cầu tài": "Tài lộc bình thường, thu chi cân đối, không lo túng thiếu.",
      "Tật bệnh": "Chú ý giữ gìn sức khỏe khi thời tiết thay đổi, không có gì đáng lo.",
      "Hôn nhân": "Tình duyên tự đến dù muộn màng, cần kiên trì chân thành.",
      "Xuất hành": "Xuất hành hướng Tây Bắc sẽ gặp quý nhân hỗ trợ công việc."
    }
  },
  {
    id: 10,
    name: "Quẻ Số 10 - Thượng Cát",
    title: "Hỷ Khí Lâm Môn",
    poem: "Nguyệt lão đề hồng hỷ tự lai\nNhân hòa địa lợi vận đào khai\nGia môn cát khánh trùng trùng chí\nTài lộc song toàn tiếu nhan khai.",
    translation: "Nguyệt lão se duyên hỷ tự tới,\nNhân hòa địa lợi vận đào hoa nở.\nGia đình cát khánh trùng trùng đến,\nTài lộc song toàn mặt rạng rỡ nụ cười.",
    meaning: "Vận đào hoa cực vượng, nhân duyên tốt đẹp, gia đạo có hỷ sự. Cầu tài cầu lộc đều viên mãn.",
    details: {
      "Bản thân": "Bản mệnh hanh thông, thần thái tươi tắn, gặp nhiều may mắn trong các mối quan hệ.",
      "Gia trạch": "Gia môn có tin hỷ (cưới hỏi, sinh con), không khí gia đình rộn rã niềm vui.",
      "Mưu sự": "Thuận lợi nhờ tìm được đối tác ăn ý hoặc được mọi người đồng lòng ủng hộ.",
      "Cầu tài": "Tài lộc hanh thông, thu hoạch ngoài mong đợi, buôn bán đắt hàng.",
      "Tật bệnh": "Sức khỏe dồi dào, tràn đầy năng lượng tích cực.",
      "Hôn nhân": "Hôn nhân như ý, đôi lứa hạnh phúc, vợ chồng tình cảm mặn nồng.",
      "Xuất hành": "Xuất hành vô cùng cát lợi, dễ kết giao được tri kỷ hoặc đối tác lớn."
    }
  },
  {
    id: 11,
    name: "Quẻ Số 11 - Trung Bình",
    title: "Thủ Cựu An Phận",
    poem: "Tùy duyên an phận thủ cựu nghiệp\nMạc si ngã tưởng vọng phi thiên\nTự hữu sinh cơ lai chiếu cố\nBình an nhị tự trị thiên kim.",
    translation: "Tùy duyên an phận giữ nghiệp cũ,\nChớ ham tưởng hão bay lên trời.\nTự có sinh cơ đến chiếu cố,\nHai chữ bình an đáng giá ngàn vàng.",
    meaning: "Không nên có những mong muốn viển vông hay thay đổi công việc hiện tại. Hãy trân trọng sự bình an đang có.",
    details: {
      "Bản thân": "Nên tu tâm dưỡng tính, hài lòng với những gì mình đang có.",
      "Gia trạch": "Gia đạo êm đềm bình an, không xảy ra biến cố gì lớn.",
      "Mưu sự": "Không thích hợp khởi nghiệp hay đổi việc, tiếp tục làm công việc cũ sẽ có kết quả tốt.",
      "Cầu tài": "Tài lộc ổn định, tránh đầu tư mạo hiểm kẻo tiền mất tật mang.",
      "Tật bệnh": "Chú ý chăm sóc bản thân, tránh lao lực quá độ.",
      "Hôn nhân": "Tình cảm bình dị, chân chất, không có nhiều lãng mạn nhưng rất vững bền.",
      "Xuất hành": "Không nên xuất hành đi xa vào lúc này, ở nhà an toàn hơn."
    }
  },
  {
    id: 12,
    name: "Quẻ Số 12 - Thượng Thượng",
    title: "Ngư Dược Long Môn",
    poem: "Long môn đắc ý bộ vân tiêu\nVạn lý giang sơn nhậm ngã tiêu\nPhong vân hội hợp cơ duyên chí\nNhất cử thành danh thiên hạ kiêu.",
    translation: "Long môn đắc ý bước chín tầng mây,\nVạn dặm non sông thỏa sức vẫy vùng.\nRồng mây hội tụ cơ duyên tới,\nMột bước thành danh cả thiên hạ tự hào.",
    meaning: "Đỉnh cao của sự nghiệp và danh vọng. Cơ hội hiếm có để thay đổi hoàn toàn cuộc đời theo hướng tốt đẹp nhất.",
    details: {
      "Bản thân": "Vận khí cực kỳ hanh thông, học hành thi cử đỗ đầu, thăng tiến vượt bậc.",
      "Gia trạch": "Gia tộc vẻ quang, rạng danh tổ tông, con cháu hiển đạt.",
      "Mưu sự": "Mọi kế hoạch lớn lao đều thành công rực rỡ, được xã hội công nhận.",
      "Cầu tài": "Tài lộc phát đạt vô số, tiền bạc dư dả dư của ăn của để.",
      "Tật bệnh": "Cơ thể khỏe mạnh lực lưỡng, bệnh cũ biến mất hoàn toàn.",
      "Hôn nhân": "Kết hôn với người môn đăng hộ đối, vợ chồng vinh hiển cùng nhau.",
      "Xuất hành": "Xuất hành vô cùng thuận lợi và vinh quang, có lợi cho công danh."
    }
  },
  {
    id: 13,
    name: "Quẻ Số 13 - Hạ Hạ",
    title: "Thuyền Lậu Phong Cấp",
    poem: "Thuyền lậu phùng phong cấp thủy hành\nGia sơn vạn lý mịch vô trình\nTạm thời tránh nạn vô phương tiến\nTĩnh đãi triều bình thủy thế thanh.",
    translation: "Thuyền thủng gặp gió giữa dòng nước chảy xiết,\nQuê nhà vạn dặm mờ mịt không thấy đường về.\nTạm thời lánh nạn không thể tiến lên,\nYên lặng đợi triều dâng sóng lặng nước trong xanh.",
    meaning: "Họa vô đơn chí, khó khăn chồng chất khó khăn. Cần tuyệt đối dừng mọi hoạt động lớn, tìm nơi trú ẩn an toàn.",
    details: {
      "Bản thân": "Bản mệnh gặp nguy nan, đề phòng tai bay vạ gió, tránh xa thị phi pháp luật.",
      "Gia trạch": "Gia đình gặp biến cố lớn hoặc hao tài tốn của nghiêm trọng.",
      "Mưu sự": "Dự án thất bại thảm hại, tránh đầu tư thêm để gỡ gạc kẻo mất trắng.",
      "Cầu tài": "Nợ nần chồng chất hoặc thất thoát tiền của lớn, hãy thắt lưng buộc bụng.",
      "Tật bệnh": "Bệnh tình nguy kịch, cần điều trị tích cực ngay lập tức.",
      "Hôn nhân": "Đôi bên mâu thuẫn gay gắt dẫn đến đổ vỡ, khó lòng hàn gắn.",
      "Xuất hành": "Cấm kỵ đi xa, đi sông nước rất nguy hiểm, nên ở nhà."
    }
  },
  {
    id: 14,
    name: "Quẻ Số 14 - Trung Cát",
    title: "Gia Môn Hưng Thịnh",
    poem: "Gia môn thanh cát khánh dư sinh\nTứ quý bình an lộc tự sinh\nThường hành thiện sự thiên quân chiếu\nVạn sự vô ưu đắc thái bình.",
    translation: "Cửa nhà yên ổn chúc mừng đời ta,\nBốn mùa bình an tự sinh tài lộc.\nThường làm việc thiện trời cao chiếu cố,\nVạn sự không lo, hưởng thái bình.",
    meaning: "Gia đạo yên bình, cuộc sống êm ấm nhờ tích đức hành thiện. Tài lộc tự nhiên đưa tới không cần cầu cạnh.",
    details: {
      "Bản thân": "Tâm tính hướng thiện, cuộc sống an nhàn, không gặp sóng gió lớn.",
      "Gia trạch": "Gia đạo hòa thuận, anh em kính nhường, con cái ngoan ngoãn hiếu thảo.",
      "Mưu sự": "Mưu sự thuận lợi nhờ sự lương thiện và trung thực của bản thân.",
      "Cầu tài": "Tài lộc ở mức khá, tiền bạc đến chậm nhưng chắc chắn và bền vững.",
      "Tật bệnh": "Sức khỏe tốt, ít ốm đau bệnh tật vặt.",
      "Hôn nhân": "Gia đình êm ấm, vợ chồng thủy chung, tôn trọng lẫn nhau.",
      "Xuất hành": "Nên đi du lịch gia đình hoặc đi lễ chùa cầu an rất tốt."
    }
  },
  {
    id: 15,
    name: "Quẻ Số 15 - Thượng Cát",
    title: "Kim Bảng Đề Danh",
    poem: "Kim bảng đề danh tự hữu thời\nThập niên hàn song khởi vô tri\nThời lai phong tống đằng vân khứ\nNhất bộ cao thăng lập vạn kỳ.",
    translation: "Bảng vàng khắc tên tự có lúc,\nMười năm đèn sách há vô danh.\nThời tới gió đưa bay lên mây,\nMột bước thăng cao lập kỳ tích vạn đời.",
    meaning: "Sự cố gắng kiên trì suốt thời gian qua sắp được đền đáp xứng đáng. Công danh sự nghiệp thăng tiến.",
    details: {
      "Bản thân": "Học hành tấn tới, thi cử đỗ đạt cao, năng lực được công nhận.",
      "Gia trạch": "Gia đình tự hào về thành tựu của bạn, gia đạo vẻ vang.",
      "Mưu sự": "Thăng tiến trong công việc, ký kết được các hợp đồng lớn quan trọng.",
      "Cầu tài": "Tài lộc dồi dào nhờ công danh mang lại, lương thưởng tăng cao.",
      "Tật bệnh": "Tinh thần phấn chấn giúp cơ thể khỏe mạnh dẻo dai.",
      "Hôn nhân": "Đôi bên môn đăng hộ đối, cùng tiến bước xây dựng tương lai.",
      "Xuất hành": "Xuất hành đi thi cử, phỏng vấn hoặc nhận chức vô cùng cát lợi."
    }
  },
  {
    id: 16,
    name: "Quẻ Số 16 - Hạ Cát",
    title: "Mai Khai Trong Tuyết",
    poem: "Tuyết lý mai hoa tiệm tiệm khai\nGian nan lịch tận cát tường lai\nMặc đãi hàn phong tiêu tán tận\nTự hữu xuân quang báo hỷ đài.",
    translation: "Hoa mai trong tuyết hé nở dần,\nGian nan trải hết điều lành tới.\nĐợi cho gió lạnh tan biến hết,\nTự có ánh xuân báo tin vui về.",
    meaning: "Khó khăn sắp kết thúc, hy vọng mới đang nhen nhóm dần. Cần kiên nhẫn vượt qua chặng cuối cùng.",
    details: {
      "Bản thân": "Bản thân cần kiên nhẫn chịu đựng thử thách cuối cùng trước khi hái quả ngọt.",
      "Gia trạch": "Gia đạo dần dần ổn định sau những xung đột, ấm áp trở lại.",
      "Mưu sự": "Công việc bắt đầu có tiến triển khả quan, hướng đi mới đúng đắn.",
      "Cầu tài": "Tài lộc bắt đầu khởi sắc, tiền bạc dần dư dả hơn trước.",
      "Tật bệnh": "Bệnh tình chuyển biến tốt dần lên, chú ý giữ ấm cơ thể.",
      "Hôn nhân": "Tình cảm dần ấm lại sau thời gian nguội lạnh, hai bên hiểu nhau hơn.",
      "Xuất hành": "Đi xa có chút lạnh giá/khó khăn ban đầu, sau đó suôn sẻ."
    }
  },
  {
    id: 17,
    name: "Quẻ Số 17 - Trung Bình",
    title: "Thạch Trung Ẩn Ngọc",
    poem: "Thạch trung ẩn ngọc vị năng khai\nVạn sự tu phòng bất ý tai\nTĩnh tâm đãi thời cầu minh triết\nTự hữu quý nhân cổ vũ lai.",
    translation: "Trong đá ẩn ngọc chưa thể khai thác,\nMọi việc nên phòng tai họa bất ngờ.\nTĩnh tâm đợi thời cầu trí tuệ,\nTự có quý nhân đến cổ vũ giúp sức.",
    meaning: "Tài năng hay cơ hội đang bị che giấu, chưa lộ diện rõ ràng. Cần trau dồi bản thân thêm và chờ người hiền mắt tinh phát hiện.",
    details: {
      "Bản thân": "Bản thân có năng lực nhưng chưa được trọng dụng, chớ nên nản lòng.",
      "Gia trạch": "Gia đạo bình an, cuộc sống không quá giàu sang nhưng êm ấm.",
      "Mưu sự": "Chưa thích hợp khởi đầu việc mới hoành tráng, hãy chuẩn bị kỹ lưỡng trước.",
      "Cầu tài": "Tài lộc tiềm ẩn, chưa thu hoạch ngay được, đầu tư dài hạn thì tốt.",
      "Tật bệnh": "Đề phòng bệnh ngầm trong cơ thể, nên đi khám sức khỏe tổng quát.",
      "Hôn nhân": "Đối phương là người tốt nhưng kín tiếng, cần thời gian tìm hiểu sâu hơn.",
      "Xuất hành": "Xuất hành bình thường, đi xa không có nhiều lợi lộc."
    }
  },
  {
    id: 18,
    name: "Quẻ Số 18 - Thượng Thượng",
    title: "Song Hỷ Lâm Môn",
    poem: "Song hỷ lâm môn cát khánh lai\nGia tài vạn quán vạn hoa khai\nNhân hiền gia cát thiên sinh phúc\nVạn sự hanh thông lập thế đài.",
    translation: "Hai niềm vui cùng đến cửa mang điều lành,\nGia sản vạn quán trăm hoa đua nở.\nNgười hiền nhà tốt trời ban phước lớn,\nVạn sự hanh thông lập nên đại nghiệp.",
    meaning: "Đại cát đại lợi, hỷ sự nhân đôi, gia đình hưng vượng giàu sang cát tường.",
    details: {
      "Bản thân": "May mắn ngập tràn, tinh thần vui vẻ phấn chấn tột đỉnh.",
      "Gia trạch": "Gia đạo vô cùng thịnh vượng, có cả tin hỷ về con cái lẫn tài sản.",
      "Mưu sự": "Thành công vang dội, mưu sự đạt kết quả mỹ mãn ngoài mong đợi.",
      "Cầu tài": "Tài lộc dồi dào, tiền bạc dâng tràn, đầu tư trúng lớn.",
      "Tật bệnh": "Khỏe mạnh hoàn hảo, không lo ốm đau bệnh tật.",
      "Hôn nhân": "Tình duyên đơm hoa kết trái ngọt ngào, cuộc sống lứa đôi hạnh phúc.",
      "Xuất hành": "Xuất hành đại cát, đi đâu cũng được cung đón kính trọng."
    }
  },
  {
    id: 19,
    name: "Quẻ Số 19 - Hạ Hạ",
    title: "Họa Vô Đơn Chí",
    poem: "Họa vô đơn chí tích phòng thân\nThị phi khẩu thiệt nhiễu cô thần\nTu tâm hướng thiện tiêu tai họa\nMạc tín tha nhân vọng tự phân.",
    translation: "Họa không đến một lần, nên đề phòng thân,\nThị phi cự cãi quấy nhiễu thân cô độc.\nTu tâm hướng thiện để tiêu trừ tai họa,\nChớ tin người ngoài mà tự chia rẽ bè phái.",
    meaning: "Gặp vận hạn nặng, nhiều điều xui xẻo xảy ra cùng lúc. Cần thành tâm sám hối, tránh tranh chấp cự cãi.",
    details: {
      "Bản thân": "Bản mệnh suy vi, dễ gặp hạn thị phi, kiện tụng hoặc tổn thương thân thể.",
      "Gia trạch": "Trong nhà lục đục, có kẻ tiểu nhân đơm đặt làm mất hòa khí.",
      "Mưu sự": "Tuyệt đối không bắt đầu dự án mới, rủi ro đổ vỡ rất cao.",
      "Cầu tài": "Hao tài tốn của nặng nề đề phòng lừa đảo mất mát tiền của lớn.",
      "Tật bệnh": "Dễ mắc bệnh dai dẳng khó chữa hoặc tai nạn, cần hết sức thận trọng.",
      "Hôn nhân": "Rạn nứt nghiêm trọng, dễ ly hôn ly thân, cần kiềm chế cái tôi.",
      "Xuất hành": "Không xuất hành đi xa, đi đứng cẩn thận xe cộ."
    }
  },
  {
    id: 20,
    name: "Quẻ Số 20 - Thượng Cát",
    title: "Bình Bộ Thanh Vân",
    poem: "Bình bộ thanh vân vạn lý trình\nThời lai vận chuyển khánh thiên thanh\nKim bảng đề danh gia cát thịnh\nCông danh phú quý lập tôn vinh.",
    translation: "Thong thả bước lên mây xanh đi vạn dặm,\nThời tới vận chuyển chúc mừng trời trong xanh.\nBảng vàng đề tên gia đình hưng thịnh,\nCông danh phú quý lập nên vinh quang tôn quý.",
    meaning: "Thời vận thăng tiến nhanh chóng và vững chắc, đạt được vị trí cao trong xã hội và giàu sang phú quý.",
    details: {
      "Bản thân": "Vận khí cực thịnh, công danh hiển đạt, nhận được sự kính trọng lớn.",
      "Gia trạch": "Gia đạo yên ấm, hưng vượng, con cái đỗ đạt cao làm vẻ vang gia đình.",
      "Mưu sự": "Công việc thăng quan tiến chức, mở rộng kinh doanh đạt thắng lợi lớn.",
      "Cầu tài": "Tài lộc phú quý dồi dào, tiền của đến từ những nguồn chính đáng và vững chắc.",
      "Tật bệnh": "Cơ thể khỏe khoắn tinh thần minh mẫn sáng suốt.",
      "Hôn nhân": "Hôn nhân hạnh phúc viên mãn, vợ chồng cùng thăng tiến trong sự nghiệp.",
      "Xuất hành": "Xuất hành vô cùng thuận lợi và vinh quang, có lợi cho công danh."
    }
  },
  {
    id: 21,
    name: "Quẻ Số 21 - Trung Bình",
    title: "Cận Thủy Lâu Đài",
    poem: "Cận thủy lâu đài tiên đắc nguyệt\nHướng dương hoa mộc dị vi xuân\nTự nhiên đắc lực vô đa lự\nTĩnh thủ gia môn phúc tự lân.",
    translation: "Lâu đài gần nước được trăng trước,\nCây cỏ hướng về phía mặt trời dễ đón xuân.\nTự nhiên đắc thế không cần lo nghĩ nhiều,\nYên lặng giữ cửa nhà phước đức tự đến bên.",
    meaning: "Nhờ có lợi thế vị trí hoặc quan hệ tốt mà gặt hái thành công thuận lợi hơn người khác. Cần biết tận dụng thời cơ.",
    details: {
      "Bản thân": "Gặp được thiên thời địa lợi, bản thân nhàn nhã mà vẫn đạt kết quả tốt.",
      "Gia trạch": "Gia môn yên ấm ổn định, có phúc khí tốt lành bao phủ.",
      "Mưu sự": "Thuận lợi tiến hành nhờ tận dụng được các mối quan hệ sẵn có.",
      "Cầu tài": "Tài lộc đều đặn ổn định, có lộc ăn lộc mặc phong phú.",
      "Tật bệnh": "Sức khỏe tốt, không có bệnh tật gì lớn.",
      "Hôn nhân": "Tình duyên êm đẹp, đôi bên thấu hiểu chia sẻ ngọt bùi.",
      "Xuất hành": "Nên đi du lịch ngắn ngày, đi xa vừa phải thì tốt hơn đi quá xa."
    }
  },
  {
    id: 22,
    name: "Quẻ Số 22 - Hạ Cát",
    title: "Bách Chiết Bất Quyên",
    poem: "Bách chiết bất quyên chung hữu thành\nGian nan hiểm trở mạc sầu sinh\nTu tri thế sự đa mài luyện\nTự hữu sinh quang chiếu cẩm trình.",
    translation: "Trăm lần gãy không nản lòng cuối cùng sẽ thành,\nGian nan hiểm trở chớ lo âu phiền muộn sinh ra.\nNên biết việc đời nhiều mài giũa,\nTự có ánh sáng sinh cơ chiếu rọi đường gấm hoa.",
    meaning: "Gặp nhiều gian nan vất vả, đòi hỏi ý chí kiên định 'thất bại là mẹ thành công'. Sự bền bỉ sẽ mang lại quả ngọt.",
    details: {
      "Bản thân": "Cần trui rèn ý chí qua thử thách khó khăn, không được nản lòng thoái chí.",
      "Gia trạch": "Gia đạo tuy có chút trục trặc nhỏ nhưng mọi người yêu thương đùm bọc nhau.",
      "Mưu sự": "Gặp nhiều chướng ngại vật cản đường, đòi hỏi sự kiên trì bền bỉ vượt qua.",
      "Cầu tài": "Tài lộc có được bằng mồ hôi công sức tự thân vận động, không có lộc trời cho.",
      "Tật bệnh": "Bệnh tật cần kiên trì điều trị lâu dài mới mong khỏi hẳn.",
      "Hôn nhân": "Trải qua nhiều ngăn cấm trắc trở mới đến được với nhau, tình yêu bền chặt.",
      "Xuất hành": "Đi xa gặp chút khó khăn trở ngại ban đầu, kiên trì sẽ đạt được mục đích."
    }
  },
  {
    id: 23,
    name: "Quẻ Số 23 - Trung Cát",
    title: "Thời Lai Vận Chuyển",
    poem: "Thời lai vận chuyển tiệm hưng long\nVạn sự khai hoa tiệm tiệm thông\nTử khí đông lai tăng phước trạch\nGia môn hòa hỷ cát tinh tòng.",
    translation: "Thời tới vận chuyển dần hưng long,\nMọi việc nở hoa thông suốt dần.\nKhí lành phương đông tới tăng thêm phước lộc,\nGia môn hòa thuận, sao cát tường theo sau.",
    meaning: "Vận khí đang trên đà phát triển đi lên mạnh mẽ, mọi khó khăn trước mắt đang dần lùi xa.",
    details: {
      "Bản thân": "Khí chất hồi phục, vận may mỉm cười, làm việc gì cũng tự tin hơn.",
      "Gia trạch": "Gia đạo hưng vượng dần, không khí gia đình vui tươi hòa thuận.",
      "Mưu sự": "Công việc làm ăn bắt đầu có khởi sắc tốt đẹp, nên mở rộng từ từ.",
      "Cầu tài": "Tài lộc tăng tiến đều đặn, buôn bán sinh lời khá.",
      "Tật bệnh": "Bệnh tình thuyên giảm rõ rệt, sức khỏe chuyển biến tích cực.",
      "Hôn nhân": "Tình cảm mặn nồng tiến triển tốt đẹp, hứa hẹn tương lai tươi sáng.",
      "Xuất hành": "Xuất hành hướng Đông vô cùng cát lợi, dễ đón nhận tin mừng."
    }
  },
  {
    id: 24,
    name: "Quẻ Số 24 - Thượng Thượng",
    title: "Thiên Địa Giao Thái",
    poem: "Thiên địa giao thái vạn vật sinh\nKhang trang đại lộ tự sinh thành\nKim ngân tài bảo vô hà hạn\nVận thế thông thiên thịnh thế danh.",
    translation: "Trời đất giao hòa vạn vật sinh sôi,\nĐường lớn khang trang tự mở ra.\nVàng bạc của cải nhiều vô kể,\nVận thế ngút trời lập danh tiếng thời thịnh trị.",
    meaning: "Thời kỳ thịnh vượng tột bậc, vạn vật sinh sôi nảy nở, tài lộc dồi dào sung túc.",
    details: {
      "Bản thân": "Vận khí vô cùng vững vàng mạnh mẽ, gặp nhiều may mắn hiếm thấy.",
      "Gia trạch": "Gia đạo đại cát thịnh vượng, mọi người bình an hạnh phúc đong đầy.",
      "Mưu sự": "Kế hoạch lớn thành công vang dội ngoài mong đợi, không gặp bất kỳ trở ngại nào.",
      "Cầu tài": "Tài lộc cực vượng, tiền bạc dồi dào đổ về như nước chảy.",
      "Tật bệnh": "Sức khỏe sung mãn vô biên, tinh thần sảng khoái vui tươi.",
      "Hôn nhân": "Lương duyên mỹ mãn tiền định, vợ chồng yêu thương tôn trọng nhau suốt đời.",
      "Xuất hành": "Xuất hành vô cùng thuận lợi hanh thông trăm bề."
    }
  },
  {
    id: 25,
    name: "Quẻ Số 25 - Hạ Hạ",
    title: "Sơn Cùng Thủy Tận",
    poem: "Sơn cùng thủy tận nghi vô lộ\nMộ sắc mang mang bộ bộ nan\nTĩnh tâm thủ cựu cầu thiên mệnh\nMạc vọng hành động họa trung tàn.",
    translation: "Núi cùng nước kiệt ngỡ hết đường đi,\nBóng chiều mờ mịt bước chân gian nan.\nTĩnh tâm giữ cũ cầu mệnh trời ban,\nChớ hành động bừa bãi kẻo chuốc họa vào thân.",
    meaning: "Rơi vào ngõ cụt bế tắc hoàn toàn. Đòi hỏi sự kiên nhẫn tĩnh lặng tuyệt đối, tránh mọi hành động nóng vội phá vỡ tình hình.",
    details: {
      "Bản thân": "Vận thế xuống thấp nhất đề phòng tiểu nhân hãm hại, tai nạn bất ngờ.",
      "Gia trạch": "Gia đạo lục đục bất hòa nghiêm trọng, tiền của suy kiệt.",
      "Mưu sự": "Kế hoạch gặp ngõ cụt thất bại hoàn toàn, nên dừng lại rút lui an toàn.",
      "Cầu tài": "Hao tài tốn của nặng nề đề phòng lừa gạt nợ nần chồng chất.",
      "Tật bệnh": "Bệnh tình diễn biến xấu nguy hiểm, cần kiên trì chữa trị khoa học.",
      "Hôn nhân": "Tình cảm rạn nứt khó cứu vãn, dễ xảy ra chia ly ly tán.",
      "Xuất hành": "Cấm kỵ đi xa, dễ gặp bất trắc nguy hiểm dọc đường đi."
    }
  },
  {
    id: 26,
    name: "Quẻ Số 26 - Trung Bình",
    title: "Họa Phúc Tương Y",
    poem: "Họa hề phúc sở ỷ, phúc hề họa sở phục\nThế sự vô thường tu tự thức\nTĩnh tâm vi thiện thiên ban phước\nTự hữu sinh quang độ hiểm nan.",
    translation: "Họa là nơi phúc dựa vào, phúc là nơi họa ẩn náu,\nViệc đời vô thường người nên tự biết lấy.\nTĩnh tâm làm việc thiện trời ban phước lành,\nTự có ánh sáng sinh cơ giúp vượt qua hiểm nguy.",
    meaning: "Họa phúc khôn lường đan xen lẫn nhau. Cần khiêm tốn khi thành công và vững vàng khi gặp thất bại.",
    details: {
      "Bản thân": "Bản thân cần giữ tâm thái bình thản trước mọi thăng trầm cuộc sống.",
      "Gia trạch": "Gia đạo bình thường lúc vui lúc buồn đan xen cần bao dung thấu hiểu nhau.",
      "Mưu sự": "Thành công hay thất bại phụ thuộc vào sự tỉnh táo và biết dừng đúng lúc.",
      "Cầu tài": "Tài lộc có biến động lớn trồi sụt thất thường không nên tham lam lớn.",
      "Tật bệnh": "Sức khỏe bình thường đề phòng các bệnh cũ tái phát.",
      "Hôn nhân": "Tình cảm cần sự thấu hiểu từ hai phía tránh tranh cãi chuyện tiền bạc.",
      "Xuất hành": "Xuất hành vừa phải an toàn không nên đi quá xa lâu ngày."
    }
  },
  {
    id: 27,
    name: "Quẻ Số 27 - Thượng Cát",
    title: "Ngũ Phúc Lâm Môn",
    poem: "Ngũ phúc lâm môn cát tinh chiếu\nGia đình hưng vượng vạn sự khang\nTài nguyên quảng tiến thiên thiên phú\nPhú quý vinh hoa lộc tự mang.",
    translation: "Năm phước vào nhà sao lành chiếu rọi,\nGia đình hưng thịnh vạn sự bình an.\nNguồn tài lộc rộng mở ngày càng giàu có,\nPhú quý vinh hoa tài lộc tự mang đến.",
    meaning: "Cát tinh cao chiếu, nhận được nhiều hồng ân trời ban, gia đình may mắn sung túc đủ đầy mọi mặt.",
    details: {
      "Bản thân": "Vận khí hanh thông rực rỡ, cuộc sống vui vẻ hạnh phúc viên mãn.",
      "Gia trạch": "Gia môn thịnh vượng đầy ắp tiếng cười đón nhận nhiều hỷ sự.",
      "Mưu sự": "Công việc thuận lợi thăng quan tiến chức dễ dàng thuận lợi vô ngần.",
      "Cầu tài": "Tài lộc dồi dào kinh doanh buôn bán thu lợi lớn.",
      "Tật bệnh": "Khỏe mạnh cường tráng tinh thần phấn chấn lạc quan yêu đời.",
      "Hôn nhân": "Lương duyên hòa hợp gia đình hạnh phúc bền lâu.",
      "Xuất hành": "Xuất hành vô cùng thuận lợi gặt hái nhiều thắng lợi."
    }
  },
  {
    id: 28,
    name: "Quẻ Số 28 - Hạ Cát",
    title: "Kinh Cức Mãn Đồ",
    poem: "Kinh cức mãn đồ bộ bộ nan\nDũng cảm tiến lên mạc thối nhàn\nLịch tận phong ba kiến thanh hải\nTự hữu quang minh chiếu ngọc quan.",
    translation: "Gai góc đầy đường đi mỗi bước đều khó khăn,\nDũng cảm tiến lên chớ lui bước lười nhác.\nTrải hết phong ba nhìn thấy biển xanh trong,\nTự có ánh sáng chiếu rọi cửa ngọc vinh quang.",
    meaning: "Đường đi đầy chông gai chướng ngại vật cản lối. Chỉ có dũng cảm kiên cường chiến đấu mới mong đạt được vinh quang cuối con đường.",
    details: {
      "Bản thân": "Gặp nhiều áp lực thử thách lớn cần rèn luyện tinh thần sắt thép.",
      "Gia trạch": "Gia đạo có xáo trộn bất hòa cần bình tĩnh giải quyết tháo gỡ nút thắt.",
      "Mưu sự": "Gặp nhiều đối thủ cạnh tranh khốc liệt hoặc thủ tục khó khăn trở ngại.",
      "Cầu tài": "Tài lộc khó kiếm, kiếm tiền vất vả đòi hỏi nhiều nỗ lực phi thường.",
      "Tật bệnh": "Chú ý giữ gìn sức khỏe đề phòng kiệt sức do làm việc quá sức.",
      "Hôn nhân": "Tình cảm gặp nhiều ngăn cấm trắc trở thử thách lòng trung thủy.",
      "Xuất hành": "Hạn chế đi xa nếu đi phải chuẩn bị kế hoạch dự phòng chu đáo."
    }
  },
  {
    id: 29,
    name: "Quẻ Số 29 - Trung Cát",
    title: "Xuân Phong Hóa Vũ",
    poem: "Xuân phong hóa vũ nhuận quần sinh\nVạn sự thông đạt tự hữu tình\nKỷ vãng khai lai đa cát lợi\nGia môn hỷ khí tiếu đàm thanh.",
    translation: "Gió xuân mưa móc thấm nhuần muôn loài,\nMọi việc thông suốt tự nhiên có tình nghĩa.\nKế thừa quá khứ mở ra tương lai nhiều cát lợi,\nGia môn vui tươi rộn rã tiếng cười nói chuyện.",
    meaning: "Công danh sự nghiệp và cuộc sống gia đình được hưởng lợi nhờ lòng nhân ái bao dung và ứng xử thấu tình đạt lý.",
    details: {
      "Bản thân": "Bản thân có uy tín và lòng tốt được mọi người tôn trọng kính nể.",
      "Gia trạch": "Gia đình đầm ấm hòa thuận đầy ắp tình yêu thương sẻ chia.",
      "Mưu sự": "Thuận lợi nhờ tinh thần hợp tác đôi bên cùng có lợi.",
      "Cầu tài": "Tài lộc khá tốt tiền bạc đến từ sự chân thành và uy tín trong làm ăn.",
      "Tật bệnh": "Sức khỏe dồi dào bệnh nhẹ tiêu tan nhanh chóng.",
      "Hôn nhân": "Nhân duyên hòa hợp tốt lành gia đình hạnh phúc ấm êm.",
      "Xuất hành": "Xuất hành du lịch cầu tài lộc cầu bình an vô cùng thuận lợi."
    }
  },
  {
    id: 30,
    name: "Quẻ Số 30 - Thượng Thượng",
    title: "Càn Khôn Định Vị",
    poem: "Càn khôn đại định vạn sự hưng\nVạn cổ thiên thu lộc tự sinh\nThế sự hanh thông quang thế đại\nKim triều vinh hiển hiển gia minh.",
    translation: "Trời đất đại định vạn sự hưng thịnh,\nMuôn đời ngàn năm tài lộc tự sinh ra.\nViệc đời hanh thông làm sáng tỏ thế hệ,\nHôm nay vinh hiển làm rạng rỡ gia tộc danh tiếng.",
    meaning: "Sự nghiệp công danh vững chắc kiên cố như bàn thạch, tài lộc muôn đời vinh hoa hiển đạt vẻ vang gia môn.",
    details: {
      "Bản thân": "Bản mệnh đại cát vững vàng tài giỏi đạt thành tựu tột đỉnh vinh quang.",
      "Gia trạch": "Gia đạo vô cùng hưng vượng giàu sang phú quý ngập tràn niềm vui gia tộc.",
      "Mưu sự": "Kế hoạch lớn lao kiên cố thành công mỹ mãn đặt nền móng lâu dài.",
      "Cầu tài": "Tài lộc thịnh vượng tích lũy được nhiều tài sản của cải giá trị lớn.",
      "Tật bệnh": "Khỏe mạnh trường thọ tinh thần sung mãn vô ưu vô lo.",
      "Hôn nhân": "Hôn nhân hạnh phúc viên mãn trăm năm bạc đầu nghĩa tình sâu đậm.",
      "Xuất hành": "Xuất hành vô cùng đại cát đi đâu cũng gặt hái thành công danh vọng vẻ vang."
    }
  }
];
