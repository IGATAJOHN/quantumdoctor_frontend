
import DashboardLayout from "@/layouts/dashboard"

import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);



const FuturePrediction = () => {
    const bloodPressureData = {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
            {

                data: [120, 125, 130, 128, 135, 140, 138, 142],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
            {

                data: [80, 82, 85, 84, 88, 90, 89, 91],
                borderColor: '#60a5fa',
                backgroundColor: 'rgba(96, 165, 250, 0.5)',
            },
        ],
    };

    const bloodOxygenData = {
        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {

                data: [96, 95, 97, 96, 98, 99, 98],
                backgroundColor: '#3b82f6',
            },
        ],
    };

    const bmiStackedData = {
        labels: [17, 18, 19, 20, 21, 22, 23, 24, 25],
        datasets: [
            {

                data: [96, 95, 97, 96, 98, 99, 98],
                backgroundColor: '#3b82f6',
                borderColor: 'rgba(34, 197, 94, 0.2)',

            },

        ],
    };



    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    };

    return (
        <DashboardLayout>

            <div className="p-6 max-w-5xl mx-auto overflow-auto">
                <h2 className="text-3xl font-semibold mb-6">Future Health Prediction</h2>

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">

                    {/* Blood Pressure */}
                    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col overflow-hidden">
                        <h2 className="text-md font-semibold mb-2">Blood Pressure</h2>
                        <Line data={bloodPressureData} options={options} />
                        <p className="text-gray-700 text-sm mt-2">
                            Your systolic blood pressure is projected to increase by 10mmHg over the next 2 weeks.
                        </p>
                    </div>

                    {/* Blood Oxygen */}
                    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col overflow-hidden">
                        <h2 className="text-md font-semibold mb-2">Blood Oxygen</h2>
                        <Bar data={bloodOxygenData} options={options} />
                        <p className="text-gray-700 text-sm mt-20">
                            Your blood oxygen levels are stable at 96%, with a predicted increase in August.
                        </p>
                    </div>

                    {/* Right Column: Blood Oxygen and Heart Rate Prediction */}


                    {/* Body Mass Index (BMI) */}
                    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col overflow-hidden">
                        <h2 className="text-md font-semibold mb-2">Body Mass Index (BMI)</h2>
                        <Bar data={bmiStackedData} options={options} />
                        <p className="text-gray-700 text-sm mt-2">
                            Your BMI is projected to increase by 1.5 points over the next month based on your current weight trend.
                        </p>
                    </div>

                    {/* Heart Rate Prediction */}
                    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col overflow-hidden">
                        <h2 className="text-md font-semibold mb-10">Heart Rate Prediction</h2>
                        <div className="text-gray-700 text-sm mb-20">
                            <p>Current: <strong>80 bpm</strong></p>
                            <p>Projected: <strong>85 bpm</strong> (increased)</p>
                            <p>Target: <strong>60-70 bpm</strong> (ideal resting rate)</p>
                        </div>
                        <div className="mt-6 mb-6 h-24 bg-gradient-to-t from-blue-900 to-white rounded-lg" />
                    </div>

                </div>

            </div>

        </DashboardLayout >
    );
}


export default FuturePrediction;
