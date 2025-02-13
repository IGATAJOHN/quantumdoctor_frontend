import React, { useState } from 'react'

const SignupForm = () => {
    const [formStage, setFormStage] = useState(1)
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        contact: '',
        dateOfBirth: '',
        location: '',
        termsAccepted: false,
    })
    const [selectedImages, setSelectedImages] = useState<number[]>([])
    const [error, setError] = useState('')
    const [captchaChecked, setCaptchaChecked] = useState(false) // For Stage 4
    const [registrationComplete, setRegistrationComplete] = useState(false) // For success message
    const [isModalOpen, setIsModalOpen] = useState(false) // State for modal visibility

    // Images (mock images for bicycle selection)
    const images = [
        { id: 1, src: '/images/image1.jpg', alt: 'Car' },
        { id: 2, src: '/images/image3.jpg', alt: 'Bicycle 1' },
        { id: 3, src: '/images/image2.jpg', alt: 'Motorcycle' },
        { id: 4, src: '/images/image4.jpg', alt: 'Bicycle 2' },
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, termsAccepted: e.target.checked })
    }

    const handleContinue = () => {
        if (
            formData.firstName &&
            formData.email &&
            formData.contact &&
            formData.termsAccepted
        ) {
            setFormStage(2) // Move to Stage 2
        } else {
            alert('Please fill out all fields and accept the terms.')
        }
    }

    const handleVerifyAndContinue = () => {
        // Here, you can check if CAPTCHA is verified
        setIsModalOpen(true)
    }

    const handleImageSelect = (id: number) => {
        setError('')
        if (selectedImages.includes(id)) {
            setSelectedImages(selectedImages.filter((img) => img !== id))
        } else {
            setSelectedImages([...selectedImages, id])
        }
    }

    const handleRegister = () => {
        if (
            selectedImages.some(
                (id) =>
                    !images.find((img) => img.id === id)?.alt.includes('Bike')
            )
        ) {
            setError('Please select only images with bicycles.')
        } else {
            setError(null)
            // Continue with registration logic
        }
        setIsModalOpen(true) // after verification
        setFormStage(4)
    }

    const handleFinalRegister = () => {
        if (captchaChecked) {
            // Registration is successful
            setRegistrationComplete(true)
        } else {
            setError(
                'Please check the CAPTCHA box to confirm you are not a robot.'
            )
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-blue-200 flex flex-col justify-center items-center">
                <img
                    src="/images/bro.png"
                    alt="Doctor illustration"
                    className="w-2/3 mb-4"
                />
                <p className="text-center font-semibold text-xl">
                    Step into a healthier you with our AI doctor at your
                    fingertips.
                </p>
                <p className="mt-2">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600">
                        Log in
                    </a>
                </p>
            </div>
            <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
                {!registrationComplete ? (
                    <>
                        {formStage === 1 && (
                            <>
                                <div className="flex justify-center items-center p-4 ">
                                    <img
                                        src="/images/logo.jpg"
                                        className="h-20 w-auto"
                                        alt="Workflow logo"
                                    />
                                </div>
                                <h2 className="text-2xl font-semibold mb-6 flex justify-center items-center p-4">
                                    Create an account
                                </h2>
                                <div className="flex space-x-4 mb-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    className="w-full border border-gray-300 p-2 rounded-md mb-4"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="contact"
                                    placeholder="Contact"
                                    className="w-full border border-gray-300 p-2 rounded-md mb-4"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="w-full border border-gray-300 p-2 rounded-md mb-4"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    className="w-full border border-gray-300 p-2 rounded-md mb-4"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                />
                                <div className="flex items-center mb-6">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mr-2"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor="terms">
                                        I agree to the Terms & Conditions and
                                        Privacy Policy.
                                    </label>
                                </div>
                                <button
                                    onClick={handleContinue}
                                    className="bg-blue-600 text-white w-full p-2 rounded-md hover:bg-blue-700 transition duration-300"
                                >
                                    Continue
                                </button>
                            </>
                        )}

                        {formStage === 2 && (
                            <>
                                <div className="flex justify-center items-center p-4 ">
                                    <img
                                        src="/images/logo.jpg"
                                        className="h-20 w-auto"
                                        alt="Workflow logo"
                                    />
                                </div>
                                <h2 className="text-2xl font-semibold mb-6 flex justify-center items-center p-4">
                                    Create an account{' '}
                                </h2>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="password" className="mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="border border-gray-300 p-2 rounded-md mb-4"
                                        placeholder="Enter your password"
                                    />
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-1"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="border border-gray-300 p-2 rounded-md mb-4"
                                        placeholder="Confirm your password"
                                    />
                                    <label htmlFor="role" className="mb-1">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        className="border border-gray-300 p-2 rounded-md mb-4"
                                    >
                                        <option value="" disabled selected>
                                            Select your role
                                        </option>
                                        <option value="user">Patient</option>
                                        <option value="client">Doctor</option>
                                    </select>
                                </div>
                                <div className="flex justify-center items-center mb-6">
                                    <input
                                        type="checkbox"
                                        id="captcha"
                                        className="mr-2"
                                    />
                                    <label htmlFor="captcha">
                                        I am not a robot
                                    </label>
                                </div>
                                <button
                                    onClick={handleVerifyAndContinue}
                                    className="bg-green-600 text-white w-full p-2 rounded-md hover:bg-green-700 transition duration-300"
                                >
                                    Register
                                </button>
                                {/* <p className="text-gray-600 mb-4">Please click on all images that show a bicycle.</p> */}

                                {isModalOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                                        <div className="relative max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                                            <h3 className="text-xl font-semibold mb-4">
                                                Please select all images with
                                                bicycles
                                            </h3>
                                            <div className="grid grid-cols-3 gap-4 mb-4">
                                                {images.map((image) => (
                                                    <div
                                                        key={image.id}
                                                        className={`border-2 p-2 rounded-md cursor-pointer ${selectedImages.includes(
                                                            image.id
                                                        )
                                                            ? 'border-green-600'
                                                            : 'border-gray-300'
                                                            }`}
                                                        onClick={() =>
                                                            handleImageSelect(
                                                                image.id
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={image.src}
                                                            alt={image.alt}
                                                            className="w-full h-24 object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            {error && (
                                                <p className="text-red-600 mb-4">
                                                    {error}
                                                </p>
                                            )}
                                            <button
                                                onClick={handleRegister}
                                                className="bg-green-600 text-white w-full p-2 rounded-md hover:bg-green-700 transition duration-300"
                                            >
                                                Verify
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setIsModalOpen(false)
                                                }
                                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Stage 4 - Final CAPTCHA check and success */}
                        {formStage === 4 && (
                            <>
                                <div className="flex justify-center items-center p-4 ">
                                    <img
                                        src="/images/logo.jpg"
                                        className="h-20 w-auto"
                                        alt="Workflow logo"
                                    />
                                </div>
                                <h2 className="text-2xl font-semibold mb-6 flex justify-center items-center p-4">
                                    Create an account{' '}
                                </h2>
                                <div className="flex items-center mb-6">
                                    <input
                                        type="checkbox"
                                        id="finalCaptcha"
                                        className="mr-2"
                                        checked={captchaChecked}
                                        onChange={() =>
                                            setCaptchaChecked(!captchaChecked)
                                        }
                                    />
                                    <label htmlFor="finalCaptcha">
                                        I am not a robot
                                    </label>
                                </div>
                                <button
                                    onClick={handleFinalRegister}
                                    className="bg-blue-600 text-white w-full p-2 rounded-md hover:bg-blue-700 transition duration-300"
                                >
                                    Register & Complete
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">
                            Registration Successful!
                        </h2>
                        <p>
                            Thank you for signing up. You can now access your
                            account.
                        </p>
                        <a
                            href="/login"
                            className="text-blue-600 mt-4 inline-block"
                        >
                            Go to Login
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignupForm
