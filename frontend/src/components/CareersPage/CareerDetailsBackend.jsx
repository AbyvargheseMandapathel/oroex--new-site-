import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, ChevronLeft, Briefcase } from 'lucide-react';
import Loader from '../Loader/Loader';
import { getCareerDetails } from '../../api';
import '../RichText.css';
import './CareersPage.css';

const CareerDetailsBackend = () => {
    const { slug } = useParams();
    const [career, setCareer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCareerDetails = async () => {
            try {
                const data = await getCareerDetails(slug);
                setCareer(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching career details:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCareerDetails();
    }, [slug]);

    if (loading) return <Loader text="Loading job details..." />;
    if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;
    if (!career) return <div className="text-center py-10">Job not found.</div>;

    return (
        <div className="careers-page-wrapper">
            <div className="w-full max-w-4xl px-4">
                <Link to="/careers" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ChevronLeft size={20} className="mr-1" /> Back to Careers
                </Link>

                <div className="bg-[#111] border border-[#222] rounded-xl p-8 md:p-12 shadow-sm">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">{career.title}</h1>

                    <div className="flex flex-wrap gap-6 mb-8 text-gray-400 border-b border-[#333] pb-8">
                        <div className="flex items-center">
                            <MapPin size={20} className="mr-2 text-white" />
                            <span>{career.location}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock size={20} className="mr-2 text-white" />
                            <span>{career.type}</span>
                        </div>
                        <div className="flex items-center">
                            <Briefcase size={20} className="mr-2 text-white" />
                            <span>Job ID: {career.id}</span>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-300 rich-text-content dark-mode"
                        dangerouslySetInnerHTML={{ __html: career.description }}
                    />

                    <div className="mt-12 pt-8 border-t border-[#333]">
                        <h3 className="text-xl font-bold mb-4 text-white">Interested?</h3>
                        <p className="mb-6 text-gray-400">
                            Send your CV and a cover letter to <a href="mailto:careers@oroex.com" className="text-white hover:underline font-medium">careers@oroex.com</a> with the subject line "Application for {career.title}".
                        </p>
                        <a
                            href={`mailto:careers@oroex.com?subject=Application for ${career.title}`}
                            className="inline-flex items-center justify-center px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors font-medium"
                        >
                            Apply for this Position
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerDetailsBackend;
