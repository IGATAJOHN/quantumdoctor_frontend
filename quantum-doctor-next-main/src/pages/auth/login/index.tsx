import React from "react"
import { useState } from "react"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { useRouter } from "next/router"
// import Link from "next/link"
import { Label } from "@/components/ui/label"

const LoginPage = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
//   const router = useRouter()

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rememberMe: e.target.checked })
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
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
                    Don&rsquo;t have an account?{' '} <br/>
                    <a href="/auth/signup" className="text-blue-600">
                        Create one
                    </a>
                </span>
            </p>
        </div>
        <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center">
            <div className="flex justify-center items-center p-4 ">
                <img
                    src="/images/logo.svg"
                    className="h-[190px] w-auto"
                    alt="Workflow logo"
                />
            </div>
            <h2 className="text-quantum-blue text-2xl font-semibold mb-6 flex justify-center items-center p-4">
                Log in
            </h2>
            <Input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full border border-gray-300 p-2 rounded-md mb-4"
                value={formData.email}
                onChange={handleInputChange}
            />
            <Input
                type="text"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-2 rounded-md mb-4"
                value={formData.password}
                onChange={handleInputChange}
            />
            <div className="flex items-center mb-6 text-text-primary font-light">
                <input
                    type='checkbox'
                    id="terms"
                    className="mr-2"
                    checked={formData.rememberMe}
                    onChange={handleCheckboxChange}
                />
                <Label htmlFor="terms" className='text-sm text-text-secondary'>
                    Remember me
                </Label>
            </div>
            <Button
                onClick={handleSubmit}
                disabled={!formData.email || !formData.password}
                className="bg-quantum-blue text-white w-full p-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
                Log in
            </Button>
        </div>
    </div>
  )
}

export default LoginPage;