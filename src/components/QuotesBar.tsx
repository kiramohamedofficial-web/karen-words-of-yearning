const QuotesBar = () => {
  const quotes = [
    "الكلمات هي الجسر الذي يعبر عليه الحنين إلى الماضي",
    "في كل قصة حزن، هناك بصيص من الأمل ينتظر أن يُكتشف",
    "الكتابة ليست مهنة، بل هي طريقة للحياة",
    "أحيانًا تكون الذكريات أثقل من أن نحملها، وأخف من أن نتركها",
    "في كل صفحة أكتبها، أترك جزءًا من روحي",
  ];

  return (
    <div className="bg-primary-dark text-primary-foreground py-4 overflow-hidden shadow-elegant">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...quotes, ...quotes].map((quote, index) => (
          <span
            key={index}
            className="inline-block mx-10 text-lg italic font-light"
          >
            "{quote}"
          </span>
        ))}
      </div>
    </div>
  );
};

export default QuotesBar;