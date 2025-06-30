'use client';

import { useState } from 'react';

// --- HELPER COMPONENTS (from your original file) ---
const InfoField = ({ label, value }) => (
    <div className="form-group flex-1 min-w-[200px]">
        <label className="form-label block font-semibold text-xs text-num-dark-text dark:text-white mb-1">{label}</label>
        <input
            type="text"
            value={value}
            readOnly
            className="form-input w-full py-2 px-3 bg-gray-100 border border-num-gray-light dark:bg-gray-800 dark:border-gray-700 rounded-md font-medium text-xs text-gray-500 dark:text-gray-400"
        />
    </div>
);

const ScheduledInstructorCard = ({ instructor }) => (
     <div className="flex flex-col items-center space-y-1">
        <img
            src={instructor.avatar || `https://ui-avatars.com/api/?name=${instructor.name.replace(' ', '+')}&background=random`} 
            alt={instructor.name}
            className="w-12 h-12 rounded-full object-cover"
        />
        <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{instructor.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{instructor.role}</p>
        </div>
    </div>
);

 const StudyModeTag = ({ mode }) => {
    const isOnline = mode === 'Online';
    const style = isOnline 
        ? "bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300" 
        : "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300";

    return (
        <div className={`rounded-md px-3 py-1 text-xs font-semibold ${style}`}>
            {mode}
        </div>
    );
};

/**
 * This is the Client Component for the Instructor Class Detail page.
 * It receives its data via props and is only responsible for rendering the UI.
 * It contains NO data-fetching logic or useEffect hooks.
 */
export default function InstructorClassDetailClientView({ initialClassDetails, initialSchedule }) {
    // State is now initialized directly from props
    const [classDetails] = useState(initialClassDetails);
    const [schedule] = useState(initialSchedule);

    const handleDownloadSchedule = () => {
        // Your PDF generation logic remains the same
        alert("Downloading schedule as PDF...");
        console.log("Downloading schedule for:", classDetails);
        console.log("Schedule data:", schedule);
    };

    if (!classDetails) {
        return <div className="p-6 text-center dark:text-white">No class data available.</div>;
    }

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className='p-6 dark:text-white'>
            <div className="section-title font-semibold text-lg text-num-dark-text dark:text-white mb-4">Class Details</div>
             <hr className="border-t border-slate-300 dark:border-slate-700 mt-4 mb-8" />
            
            <div className="info-card p-3 sm:p-4 bg-white border border-num-gray-light dark:bg-gray-800 dark:border-gray-700 shadow-custom-light rounded-lg mb-6">
                <div className="section-title font-semibold text-sm text-num-dark-text dark:text-white mb-3">General Information</div>
                 <div className="space-y-4">
                    <div className="form-row flex gap-3 mb-2 flex-wrap">
                        <InfoField label="Name" value={classDetails.name} />
                    </div>
                    <div className="form-row flex gap-3 mb-2 flex-wrap">
                        <InfoField label="Generation" value={classDetails.generation} />
                        <InfoField label="Group" value={classDetails.group} />
                    </div>
                    <div className="form-row flex gap-3 mb-2 flex-wrap">
                        <InfoField label="Faculty" value={classDetails.faculty} />
                        <InfoField label="Degree" value={classDetails.degrees} />
                        <InfoField label="Major" value={classDetails.major} />
                    </div>
                    <div className="form-row flex gap-3 mb-2 flex-wrap">
                        <InfoField label="Semester" value={classDetails.semester} />
                        <InfoField label="Shift" value={classDetails.shift} />
                        <InfoField label="Status" value={classDetails.status} />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Schedule Class</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {daysOfWeek.map(day => {
                        const scheduledItem = schedule[day];
                        const isNoClass = !scheduledItem;

                        let dayHeaderStyle = "bg-gray-200 dark:bg-slate-700";
                        let dayBorderStyle = "border-gray-200 dark:border-slate-700";
                        let studyModeComponent = <div className="rounded-md bg-gray-200 dark:bg-slate-700 px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">No Class</div>;

                        if (scheduledItem) {
                            if (scheduledItem.studyMode === 'In-Class') {
                                dayHeaderStyle = "bg-green-100 dark:bg-green-900/50";
                                dayBorderStyle = "border-green-300 dark:border-green-700";
                                studyModeComponent = <StudyModeTag mode={scheduledItem.studyMode} />;
                            } else if (scheduledItem.studyMode === 'Online') {
                                dayHeaderStyle = "bg-orange-100 dark:bg-orange-900/50";
                                dayBorderStyle = "border-orange-300 dark:border-orange-700";
                                studyModeComponent = <StudyModeTag mode={scheduledItem.studyMode} />;
                            }
                        } else {
                            dayHeaderStyle = "bg-purple-100 dark:bg-purple-900/50";
                            dayBorderStyle = "border-purple-200 dark:border-slate-700";
                        }

                        return (
                            <div key={day} className="flex flex-col gap-2">
                                <div className={`p-2 rounded-lg text-center ${dayHeaderStyle}`}>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-base">{day}</h4>
                                </div>
                                <div className={`rounded-xl p-3 min-h-[160px] w-full border ${dayBorderStyle} flex flex-col justify-center items-center`}>
                                    {isNoClass ? (
                                        studyModeComponent
                                    ) : (
                                        <div className='w-full flex flex-col items-center text-center space-y-3'>
                                            {studyModeComponent}
                                            <ScheduledInstructorCard instructor={scheduledItem.instructor} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-8 pt-5 border-t border-gray-200 dark:border-slate-700 flex flex-wrap justify-between items-end gap-4">
                    <div>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <li>Generation : <span className="font-semibold">{classDetails.generation}</span></li>
                            <li>Group : <span className="font-semibold">{classDetails.group}</span></li>
                            <li>Semester : <span className="font-semibold">{classDetails.semester}</span></li>
                            <li>Shift : <span className="font-semibold">{classDetails.shift}</span></li>
                        </ul>
                    </div>
                    <div className="text-right">
                        <button
                            onClick={handleDownloadSchedule}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors shadow-sm"
                        >
                            Download PDF file
                        </button>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            Public Date : {new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
