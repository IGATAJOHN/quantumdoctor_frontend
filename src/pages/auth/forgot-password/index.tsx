import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const ForgotPasswordPage = () => {
    const [formData, setFormData] = useState({
        email: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // TODO: Implement forgot password logic
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="w-full p-8 md:w-1/2 bg-card-bg px-4 md:px-8 lg:px-12 flex flex-col justify-center items-center gap-y-6 text-text-primary">
                <img
                    src="/images/bro.png"
                alt="Doctor illustration"
                className="w-2/4 h-auto mb-4"
            />
            <p className="w-2/4 text-center font-semibold text-lg flex flex-col gap-y-2 mb-0 pb-0">
                Step into a healthier you with our AI doctor at your fingertips.
                <span className="mt-2 text-xs">
                    Already have an account?{' '}
                    <a href="/auth/login" className="text-blue-600">
                        Log in
                    </a>
                </span>
            </p>
        </div>
        <div className="w-full md:w-1/2 bg-white p-12 flex flex-col gap-y-6 justify-center">
            <div className="flex justify-center items-center p-4 ">
                <img
                    src="/images/logo.svg"
                    className="h-[190px] w-auto"
                    alt="Workflow logo"
                />
            </div>
            <h2 className="text-center text-quantum-blue text-2xl font-semibold mb-6 flex justify-center items-center p-4">
                Forgot Password
            </h2>
            <p className="text-quantum-blue text-sm">Enter your email address below to receive reset link.</p>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="w-full border border-gray-300 p-2 rounded-md mb-4"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <Button
                    type="submit"
                    disabled={!formData.email}
                    className="bg-quantum-blue text-white w-full p-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Send Reset Link
                </Button>
            </form>
        </div>
    </div>
    )
}

export default ForgotPasswordPage