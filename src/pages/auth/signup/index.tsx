import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import authService from '@/services/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const SignupForm = () => {
    const [formStage, setFormStage] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        dateOfBirth: '',
        location: '',
        picture: null as File | null,
        medical_license: null as File | null,
        medical_school_cert: null as File | null,
        nysc_cert: null as File | null,
        termsAccepted: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [registrationComplete, setRegistrationComplete] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, [field]: e.target.files[0] });
        }
    };

    const handleContinue = async () => {
        if (formData.firstName && formData.email && formData.contact && formData.termsAccepted) {
            setFormStage(2);
        } else {
            alert('Please fill out all fields and accept the terms.');
        }
    };

    const handleRegister = async () => {
        setLoading(true);
        setError('');

        try {
            const signupData = {
                email: formData.email,
                password: (document.getElementById('password') as HTMLInputElement)?.value || '',
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone: formData.contact,
                dateOfBirth: formData.dateOfBirth,
                picture: undefined,
                medical_license: undefined,
                medical_school_cert: undefined,
                nysc_cert: undefined
            };

            // Get file inputs
            const licenseFile = (document.getElementById('medical_license') as HTMLInputElement)?.files?.[0];
            const schoolCertFile = (document.getElementById('medical_school_cert') as HTMLInputElement)?.files?.[0];
            const nyscCertFile = (document.getElementById('nysc_cert') as HTMLInputElement)?.files?.[0];
            const pictureFile = (document.getElementById('picture') as HTMLInputElement)?.files?.[0];

            if (!licenseFile || !schoolCertFile || !nyscCertFile) {
                setError('Please upload all required certificates');
                setLoading(false);
                return;
            }

            signupData.medical_license = licenseFile;
            signupData.medical_school_cert = schoolCertFile;
            signupData.nysc_cert = nyscCertFile;
            if (pictureFile) {
                signupData.picture = pictureFile;
            }

            const result = await authService.doctorSignup(signupData);
            
            if (result.success) {
                setFormStage(4);
                setRegistrationComplete(true);
            } else {
                setError(result.error);
            }
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

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
            <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center">
                {formStage === 1 && (
                    <form className="space-y-4 w-full max-w-md">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="contact">Phone Number</Label>
                            <Input
                                id="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={formData.termsAccepted}
                                onCheckedChange={(checked) => 
                                    setFormData({ ...formData, termsAccepted: checked as boolean })
                                }
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions
                            </label>
                        </div>
                        <Button
                            type="button"
                            className="w-full"
                            onClick={handleContinue}
                            disabled={!formData.termsAccepted}
                        >
                            Continue
                        </Button>
                    </form>
                )}
                {formStage === 2 && (
                    <form className="space-y-4 w-full max-w-md">
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="border border-gray-300 p-2 rounded-md mb-4"
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                            />
                            <label htmlFor="medical_license" className="mb-1">Medical License</label>
                            <input
                                type="file"
                                id="medical_license"
                                className="border border-gray-300 p-2 rounded-md mb-4"
                                required
                                disabled={loading}
                            />
                            <label htmlFor="medical_school_cert" className="mb-1">Medical School Certificate</label>
                            <input
                                type="file"
                                id="medical_school_cert"
                                className="border border-gray-300 p-2 rounded-md mb-4"
                                required
                                disabled={loading}
                            />
                            <label htmlFor="nysc_cert" className="mb-1">NYSC Certificate</label>
                            <input
                                type="file"
                                id="nysc_cert"
                                className="border border-gray-300 p-2 rounded-md mb-4"
                                required
                                disabled={loading}
                            />
                            <label htmlFor="picture" className="mb-1">Profile Picture (Optional)</label>
                            <input
                                type="file"
                                id="picture"
                                accept="image/*"
                                className="border border-gray-300 p-2 rounded-md mb-4"
                                disabled={loading}
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mb-4">{error}</p>
                        )}
                        <button
                            onClick={handleRegister}
                            className="bg-green-600 text-white w-full p-2 rounded-md hover:bg-green-700 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                )}
                {formStage === 4 && (
                    <div className="space-y-4 w-full max-w-md">
                        <p className="text-green-600 text-sm mb-4">Registration successful! Please wait for admin approval.</p>
                        <Button
                            type="button"
                            className="w-full"
                            onClick={() => router.push('/auth/login')}
                        >
                            Go to login page
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignupForm
