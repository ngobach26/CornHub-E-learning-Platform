import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";

export default function ChapterItem(props) {
  const { lectureType, lectureTitle, duration, embedUrl } = props;
  return (
    <div className="flex items-center justify-between gap-5 xl:mx-6 group">
      <div className="flex items-center gap-5">
        {lectureType === "video" && <OndemandVideoOutlinedIcon />}
        {lectureType === "quiz" && <QuizOutlinedIcon />}
        <p className="break-all text-primary group-hover:text-gray-400">
          {lectureTitle}
        </p>
      </div>
      <p className="text-sm text-gray-400">{duration} minutes</p>
    </div>
  );
}