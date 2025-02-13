import { FC, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const TrendsChart: FC = () => {
    const [vitalType, setVitalType] = useState('Blood Pressure')
    const [timeRange, setTimeRange] = useState('This month')

    // Sample data - update this based on your logic for different vital types and time ranges
    const data = {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        datasets: [
            {
                label: vitalType,
                data: [50, 60, 45, 80, 70, 60, 75, 50, 55, 65, 70, 60],
                backgroundColor: '#2563eb',
            },
        ],
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-7xl mx-auto"> {/* Full width with max width */}
            <div className="flex justify-between mb-4">
                <select
                    className="border border-gray-300 p-2 rounded-md"
                    value={vitalType}
                    onChange={(e) => setVitalType(e.target.value)}
                >
                    <option>Blood Pressure</option>
                    <option>Heart Rate</option>
                    <option>Temperature</option>
                    {/* Add other options as needed */}
                </select>
                <select
                    className="border border-gray-300 p-2 rounded-md"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option>This month</option>
                    <option>Last 3 months</option>
                    <option>Last 6 months</option>
                    {/* Add other options as needed */}
                </select>
            </div>
            <div className="relative h-64"> {/* Set a relative height for the chart */}
                <Bar
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false, // Allow the chart to resize
                        plugins: { legend: { display: false } },
                    }}
                />
            </div>
        </div>
    )
}

export default TrendsChart
