import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "../../Button";
import ChapterForm from "./ChapterForm";
import CurriculumList from "./CurriculumList";
import LectureForm from "./LectureForm";
import ChapterItem from "./ChapterItem";

const CreateCurriculum = () => {
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [showLectureForm, setShowLectureForm] = useState(false);
  const [showChapterItemForm, setShowChapterItemForm] = useState(false);
  const [curriculumItems, setCurriculumItems] = useState([]);
  const [lectureItems, setLectureItems] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(null);
  
  const toggleChapterForm = () => {
    setShowChapterForm(!showChapterForm);
    setShowLectureForm(false);
  };
  const addChapter = (chapterTitle, duration) => {
    setCurriculumItems([...curriculumItems, { chapterTitle, duration }]);
  };

  const toggleLectureForm = (chapterIndex) => {
    setShowLectureForm(!showLectureForm);
    setShowChapterForm(false);
  };

  const addLecture = (lectureTitle, classType, duration, embedUrl) => {
    setLectureItems([
      ...lectureItems,
      { lectureTitle, classType, duration, embedUrl },
    ]);
  };
  
  const deleteChapter = (index) => {
    const updatedCurriculumItems = [...curriculumItems];
    updatedCurriculumItems.splice(index, 1);
    setCurriculumItems(updatedCurriculumItems);
  };

  const deleteLecture = (index) => {
    const updatedLectureItems = [...lectureItems];
    updatedLectureItems.splice(index, 1);
    setLectureItems(updatedLectureItems);
  };

  return (
    <div>
      <div className="flex justify-between p-6 pt-0 mb-3 border-b border-black">
        <h1 className="text-2xl font-bold">Curriculum</h1>
        <Button label="Save" type="submit" />
      </div>
      <Alert severity="info" variant="outlined">
        Here’s where you add course content—like lectures, course sections,
        assignments, and more. Click the button below to get started.
      </Alert>
      <div className="flex flex-col gap-5 mt-5 lg:flex-row">
        <div className="order-last w-full p-3 lg:w-7/12 bg-formBg h-min lg:order-first bg-slate-50">
          {showChapterForm && <ChapterForm onAddChapter={addChapter} />}
          {showLectureForm && <LectureForm onAddLecture={addLecture} />}
        </div>
        <div
          className="flex flex-col w-full gap-5 p-3 lg:w-5/12 bg-slate-50"
          style={{ maxHeight: "485px" }}
        >
          <div className="overflow-auto h-5/6">
            <CurriculumList
              curriculumItems={curriculumItems}
              lectureItems={lectureItems}
              deleteChapter={deleteChapter}
              deleteLecture={deleteLecture}
              toggleLectureForm={toggleLectureForm}
            />
          </div>
          <div className="p-2 text-left bg-cyan-50">
            <Button
              label="Add new Chapter"
              variant="transparent"
              className="text-lg"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={toggleChapterForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCurriculum;