import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import httpRequest from '../utils/httpRequest';
import useRefreshToken from '../hooks/useRefreshToken';
import Select from 'react-select';
import ReactStars from "react-stars";
import { useSpinner } from '../context/spinnerContext';
import { toast } from 'react-toastify';
import { useMemo } from "react";
import _ from 'lodash';

export default function UpdateHistoricTripModal({ show, onHide, onAdd, onUpdate, currentTrip, modalRole, type, url }) {
    const refreshToken = useRefreshToken();
    const [showScoreAlert, setShowScoreAlert] = useState('none');
    const [newTrip, setNewTrip] = useState(currentTrip || {});
    const { showSpinner, hideSpinner } = useSpinner();
    const formRef = useRef(null);
    const countries = [
        { value: 'Afghanistan', label: 'Afghanistan' },
        { value: 'Albania', label: 'Albania' },
        { value: 'Algeria', label: 'Algeria' },
        { value: 'Åland Islands', label: 'Åland Islands' },
        { value: 'American Samoa', label: 'American Samoa' },
        { value: 'Andorra', label: 'Andorra' },
        { value: 'Angola', label: 'Angola' },
        { value: 'Anguilla', label: 'Anguilla' },
        { value: 'Antarctica', label: 'Antarctica' },
        { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
        { value: 'Argentina', label: 'Argentina' },
        { value: 'Armenia', label: 'Armenia' },
        { value: 'Aruba', label: 'Aruba' },
        { value: 'Australia', label: 'Australia' },
        { value: 'Austria', label: 'Austria' },
        { value: 'Azerbaijan', label: 'Azerbaijan' },
        { value: 'Bahamas', label: 'Bahamas' },
        { value: 'Bahrain', label: 'Bahrain' },
        { value: 'Bangladesh', label: 'Bangladesh' },
        { value: 'Barbados', label: 'Barbados' },
        { value: 'Belarus', label: 'Belarus' },
        { value: 'Belgium', label: 'Belgium' },
        { value: 'Belize', label: 'Belize' },
        { value: 'Benin', label: 'Benin' },
        { value: 'Bermuda', label: 'Bermuda' },
        { value: 'Bhutan', label: 'Bhutan' },
        { value: 'Bolivia', label: 'Bolivia' },
        { value: 'Bonaire, Sint Eustatius and Saba', label: 'Bonaire, Sint Eustatius and Saba' },
        { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
        { value: 'Botswana', label: 'Botswana' },
        { value: 'Bouvet Island', label: 'Bouvet Island' },
        { value: 'Brazil', label: 'Brazil' },
        { value: 'British Indian Ocean Territory', label: 'British Indian Ocean Territory' },
        { value: 'Brunei', label: 'Brunei' },
        { value: 'Bulgaria', label: 'Bulgaria' },
        { value: 'Burkina Faso', label: 'Burkina Faso' },
        { value: 'Burundi', label: 'Burundi' },
        { value: 'Cambodia', label: 'Cambodia' },
        { value: 'Cameroon', label: 'Cameroon' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Cabo Verde', label: 'Cabo Verde' },
        { value: 'Cayman Islands', label: 'Cayman Islands' },
        { value: 'Central African Republic', label: 'Central African Republic' },
        { value: 'Chad', label: 'Chad' },
        { value: 'Chile', label: 'Chile' },
        { value: 'China', label: 'China' },
        { value: 'Christmas Island', label: 'Christmas Island' },
        { value: 'Cocos (Keeling) Islands', label: 'Cocos (Keeling) Islands' },
        { value: 'Colombia', label: 'Colombia' },
        { value: 'Comoros', label: 'Comoros' },
        { value: 'Congo', label: 'Congo' },
        { value: 'Democratic Republic of the Congo', label: 'Democratic Republic of the Congo' },
        { value: 'Costa Rica', label: 'Costa Rica' },
        { value: 'Croatia', label: 'Croatia' },
        { value: 'Cuba', label: 'Cuba' },
        { value: 'Curaçao', label: 'Curaçao' },
        { value: 'Cyprus', label: 'Cyprus' },
        { value: 'Czechia', label: 'Czechia' },
        { value: 'Denmark', label: 'Denmark' },
        { value: 'Djibouti', label: 'Djibouti' },
        { value: 'Dominica', label: 'Dominica' },
        { value: 'Dominican Republic', label: 'Dominican Republic' },
        { value: 'Ecuador', label: 'Ecuador' },
        { value: 'Egypt', label: 'Egypt' },
        { value: 'El Salvador', label: 'El Salvador' },
        { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
        { value: 'Eritrea', label: 'Eritrea' },
        { value: 'Estonia', label: 'Estonia' },
        { value: 'Eswatini', label: 'Eswatini' },
        { value: 'Ethiopia', label: 'Ethiopia' },
        { value: 'Falkland Islands (Malvinas)', label: 'Falkland Islands (Malvinas)' },
        { value: 'Faroe Islands', label: 'Faroe Islands' },
        { value: 'Fiji', label: 'Fiji' },
        { value: 'Finland', label: 'Finland' },
        { value: 'France', label: 'France' },
        { value: 'French Guiana', label: 'French Guiana' },
        { value: 'French Polynesia', label: 'French Polynesia' },
        { value: 'French Southern Territories', label: 'French Southern Territories' },
        { value: 'Gabon', label: 'Gabon' },
        { value: 'Gambia', label: 'Gambia' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'Germany', label: 'Germany' },
        { value: 'Ghana', label: 'Ghana' },
        { value: 'Gibraltar', label: 'Gibraltar' },
        { value: 'Greece', label: 'Greece' },
        { value: 'Greenland', label: 'Greenland' },
        { value: 'Grenada', label: 'Grenada' },
        { value: 'Guadeloupe', label: 'Guadeloupe' },
        { value: 'Guam', label: 'Guam' },
        { value: 'Guatemala', label: 'Guatemala' },
        { value: 'Guernsey', label: 'Guernsey' },
        { value: 'Guinea', label: 'Guinea' },
        { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
        { value: 'Guyana', label: 'Guyana' },
        { value: 'Haiti', label: 'Haiti' },
        { value: 'Heard Island and McDonald Islands', label: 'Heard Island and McDonald Islands' },
        { value: 'Holy See', label: 'Holy See' },
        { value: 'Honduras', label: 'Honduras' },
        { value: 'Hong Kong', label: 'Hong Kong' },
        { value: 'Hungary', label: 'Hungary' },
        { value: 'Iceland', label: 'Iceland' },
        { value: 'India', label: 'India' },
        { value: 'Indonesia', label: 'Indonesia' },
        { value: 'Iran', label: 'Iran' },
        { value: 'Iraq', label: 'Iraq' },
        { value: 'Ireland', label: 'Ireland' },
        { value: 'Isle of Man', label: 'Isle of Man' },
        { value: 'Israel', label: 'Israel' },
        { value: 'Italy', label: 'Italy' },
        { value: 'Jamaica', label: 'Jamaica' },
        { value: 'Japan', label: 'Japan' },
        { value: 'Jersey', label: 'Jersey' },
        { value: 'Jordan', label: 'Jordan' },
        { value: 'Kosovo', label: 'Kosovo' },
        { value: 'Kazakhstan', label: 'Kazakhstan' },
        { value: 'Kenya', label: 'Kenya' },
        { value: 'Kiribati', label: 'Kiribati' },
        { value: 'Kuwait', label: 'Kuwait' },
        { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
        { value: 'Laos', label: 'Laos' },
        { value: 'Latvia', label: 'Latvia' },
        { value: 'Lebanon', label: 'Lebanon' },
        { value: 'Lesotho', label: 'Lesotho' },
        { value: 'Liberia', label: 'Liberia' },
        { value: 'Libya', label: 'Libya' },
        { value: 'Liechtenstein', label: 'Liechtenstein' },
        { value: 'Lithuania', label: 'Lithuania' },
        { value: 'Luxembourg', label: 'Luxembourg' },
        { value: 'Macao', label: 'Macao' },
        { value: 'Madagascar', label: 'Madagascar' },
        { value: 'Malawi', label: 'Malawi' },
        { value: 'Malaysia', label: 'Malaysia' },
        { value: 'Maldives', label: 'Maldives' },
        { value: 'Mali', label: 'Mali' },
        { value: 'Malta', label: 'Malta' },
        { value: 'Marshall Islands', label: 'Marshall Islands' },
        { value: 'Martinique', label: 'Martinique' },
        { value: 'Mauritania', label: 'Mauritania' },
        { value: 'Mauritius', label: 'Mauritius' },
        { value: 'Mayotte', label: 'Mayotte' },
        { value: 'Mexico', label: 'Mexico' },
        { value: 'Micronesia', label: 'Micronesia' },
        { value: 'Moldova', label: 'Moldova' },
        { value: 'Monaco', label: 'Monaco' },
        { value: 'Mongolia', label: 'Mongolia' },
        { value: 'Montenegro', label: 'Montenegro' },
        { value: 'Montserrat', label: 'Montserrat' },
        { value: 'Morocco', label: 'Morocco' },
        { value: 'Mozambique', label: 'Mozambique' },
        { value: 'Myanmar', label: 'Myanmar' },
        { value: 'Namibia', label: 'Namibia' },
        { value: 'Nauru', label: 'Nauru' },
        { value: 'Nepal', label: 'Nepal' },
        { value: 'Netherlands', label: 'Netherlands' },
        { value: 'New Caledonia', label: 'New Caledonia' },
        { value: 'New Zealand', label: 'New Zealand' },
        { value: 'Nicaragua', label: 'Nicaragua' },
        { value: 'Niger', label: 'Niger' },
        { value: 'Nigeria', label: 'Nigeria' },
        { value: 'Niue', label: 'Niue' },
        { value: 'Norfolk Island', label: 'Norfolk Island' },
        { value: 'North Korea', label: 'North Korea' },
        { value: 'North Macedonia', label: 'North Macedonia' },
        { value: 'Northern Mariana Islands', label: 'Northern Mariana Islands' },
        { value: 'Norway', label: 'Norway' },
        { value: 'Oman', label: 'Oman' },
        { value: 'Pakistan', label: 'Pakistan' },
        { value: 'Palau', label: 'Palau' },
        { value: 'Palestine', label: 'Palestine' },
        { value: 'Panama', label: 'Panama' },
        { value: 'Papua New Guinea', label: 'Papua New Guinea' },
        { value: 'Paraguay', label: 'Paraguay' },
        { value: 'Peru', label: 'Peru' },
        { value: 'Philippines', label: 'Philippines' },
        { value: 'Pitcairn Islands', label: 'Pitcairn Islands' },
        { value: 'Poland', label: 'Poland' },
        { value: 'Portugal', label: 'Portugal' },
        { value: 'Puerto Rico', label: 'Puerto Rico' },
        { value: 'Qatar', label: 'Qatar' },
        { value: 'Romania', label: 'Romania' },
        { value: 'Russia', label: 'Russia' },
        { value: 'Rwanda', label: 'Rwanda' },
        { value: 'Réunion', label: 'Réunion' },
        { value: 'Saint Barthélemy', label: 'Saint Barthélemy' },
        { value: 'Saint Helena, Ascension and Tristan da Cunha', label: 'Saint Helena, Ascension and Tristan da Cunha' },
        { value: 'Saint Kitts and Nevis', label: 'Saint Kitts and Nevis' },
        { value: 'Saint Lucia', label: 'Saint Lucia' },
        { value: 'Saint Martin', label: 'Saint Martin' },
        { value: 'Saint Pierre and Miquelon', label: 'Saint Pierre and Miquelon' },
        { value: 'Saint Vincent and the Grenadines', label: 'Saint Vincent and the Grenadines' },
        { value: 'Samoa', label: 'Samoa' },
        { value: 'San Marino', label: 'San Marino' },
        { value: 'Sao Tome and Principe', label: 'Sao Tome and Principe' },
        { value: 'Saudi Arabia', label: 'Saudi Arabia' },
        { value: 'Senegal', label: 'Senegal' },
        { value: 'Serbia', label: 'Serbia' },
        { value: 'Seychelles', label: 'Seychelles' },
        { value: 'Sierra Leone', label: 'Sierra Leone' },
        { value: 'Singapore', label: 'Singapore' },
        { value: 'Sint Maarten', label: 'Sint Maarten' },
        { value: 'Slovakia', label: 'Slovakia' },
        { value: 'Slovenia', label: 'Slovenia' },
        { value: 'Solomon Islands', label: 'Solomon Islands' },
        { value: 'Somalia', label: 'Somalia' },
        { value: 'South Africa', label: 'South Africa' },
        { value: 'South Georgia and the South Sandwich Islands', label: 'South Georgia and the South Sandwich Islands' },
        { value: 'South Korea', label: 'South Korea' },
        { value: 'South Sudan', label: 'South Sudan' },
        { value: 'Spain', label: 'Spain' },
        { value: 'Sri Lanka', label: 'Sri Lanka' },
        { value: 'Sudan', label: 'Sudan' },
        { value: 'Suriname', label: 'Suriname' },
        { value: 'Svalbard and Jan Mayen', label: 'Svalbard and Jan Mayen' },
        { value: 'Sweden', label: 'Sweden' },
        { value: 'Switzerland', label: 'Switzerland' },
        { value: 'Syria', label: 'Syria' },
        { value: 'Taiwan', label: 'Taiwan' },
        { value: 'Tajikistan', label: 'Tajikistan' },
        { value: 'Tanzania', label: 'Tanzania' },
        { value: 'Thailand', label: 'Thailand' },
        { value: 'Timor-Leste', label: 'Timor-Leste' },
        { value: 'Togo', label: 'Togo' },
        { value: 'Tokelau', label: 'Tokelau' },
        { value: 'Tonga', label: 'Tonga' },
        { value: 'Trinidad and Tobago', label: 'Trinidad and Tobago' },
        { value: 'Tunisia', label: 'Tunisia' },
        { value: 'Turkey', label: 'Turkey' },
        { value: 'Turkmenistan', label: 'Turkmenistan' },
        { value: 'Tuvalu', label: 'Tuvalu' },
        { value: 'Uganda', label: 'Uganda' },
        { value: 'Ukraine', label: 'Ukraine' },
        { value: 'United Arab Emirates', label: 'United Arab Emirates' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'United States', label: 'United States' },
        { value: 'United States Minor Outlying Islands', label: 'United States Minor Outlying Islands' },
        { value: 'Uruguay', label: 'Uruguay' },
        { value: 'Uzbekistan', label: 'Uzbekistan' },
        { value: 'Vanuatu', label: 'Vanuatu' },
        { value: 'Vatican City', label: 'Vatican City' },
        { value: 'Venezuela', label: 'Venezuela' },
        { value: 'Vietnam', label: 'Vietnam' },
        { value: 'Virgin Islands (British)', label: 'Virgin Islands (British)' },
        { value: 'Virgin Islands (U.S.)', label: 'Virgin Islands (U.S.)' },
        { value: 'Wallis and Futuna', label: 'Wallis and Futuna' },
        { value: 'Western Sahara', label: 'Western Sahara' },
        { value: 'Yemen', label: 'Yemen' },
        { value: 'Zambia', label: 'Zambia' },
        { value: 'Zimbabwe', label: 'Zimbabwe' }
    ]

    const { currentMonth, currentYear } = useMemo(() => {
        const date = new Date();
        const currentMonth = date.getMonth() + 1; // Months are zero-based in JavaScript
        const currentYear = date.getFullYear();
        return { currentMonth, currentYear };
    }, []);

    const months = useMemo(() => {
        const monthNames = [
            { label: "January", value: 1 },
            { label: "February", value: 2 },
            { label: "March", value: 3 },
            { label: "April", value: 4 },
            { label: "May", value: 5 },
            { label: "June", value: 6 },
            { label: "July", value: 7 },
            { label: "August", value: 8 },
            { label: "September", value: 9 },
            { label: "October", value: 10 },
            { label: "November", value: 11 },
            { label: "December", value: 12 },
        ];
        return monthNames.map(month => ({
            ...month,
            isDisabled: type === 'historic'
                ? newTrip.year === currentYear && month.value > currentMonth
                : newTrip.year === currentYear && month.value < currentMonth
        }));
    }, [newTrip.year]);

    const years = useMemo(() =>
        type === 'historic'
            ? Array.from({ length: currentYear - 1949 }, (_, i) => ({
                value: currentYear - i,
                label: currentYear - i
            }))
            : Array.from({ length: 2 }, (_, i) => ({
                value: currentYear + i,
                label: currentYear + i
            })), []
    );

    const handleClose = () => {
        onHide();
        setNewTrip({});
    }

    const handleAddTrip = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        if (!form.checkValidity()) {
            form.reportValidity();
        } else if (type === 'historic' && !newTrip.score) {
            setShowScoreAlert('block');
        } else {
            try {
                showSpinner();
                const customResponse = await httpRequest({ url: url + 'add', method: 'POST', credentials: 'include', body: newTrip, refreshToken: refreshToken });
                hideSpinner();
                if (customResponse.status === 200 || 201) {
                    handleClose();
                    toast.dismiss();
                    toast.success(customResponse.data.message);
                    onAdd(customResponse.data.addedTripWithImages);
                }
            } catch (error) {
                hideSpinner();
                console.log(error.message);
            }
        }
    }

    const handleUpdateTrip = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        if (!form.checkValidity()) {
            form.reportValidity();
        } else if (!newTrip.score) {
            setShowScoreAlert('block');
        } else {
            try {
                showSpinner();
                const customResponse = await httpRequest({ url: url + 'update', method: 'PUT', credentials: 'include', body: newTrip, refreshToken: refreshToken });
                hideSpinner();
                console.log(customResponse.data.updatedTripWithImages);
                if (customResponse.status === 200) {
                    handleClose();
                    toast.dismiss();
                    toast.success(customResponse.data.message);
                    onUpdate(customResponse.data.updatedTripWithImages);
                }
            } catch (error) {
                hideSpinner();
                console.log(error.message);
            }
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton />
            <Modal.Body className=''>
                <form ref={formRef}>
                    <div className="mb-3">
                        <span className='text-danger'>*</span>
                        <label htmlFor="InputCity" className="form-label">City</label>
                        <input
                            onChange={(e) => { setNewTrip((prev) => ({ ...prev, city: _.capitalize(e.target.value) })) }}
                            required
                            type="text"
                            className="form-control"
                            id="InputCity"
                            placeholder="Enter city"
                            maxLength={25}
                            value={newTrip.city}
                        />
                    </div>
                    <div className="mb-3">
                        <span className='text-danger'>*</span>
                        <label htmlFor="InputCountry" className="form-label">Country</label>
                        <Select
                            onChange={(e) => { setNewTrip((prev) => ({ ...prev, country: e?.value })) }}
                            required
                            id="InputCountry"
                            options={countries}
                            isClearable
                            defaultValue={countries.find(c => c.value === newTrip.country)}
                        />
                    </div>
                    {type === 'historic' && <div className="mb-3">
                        <span className='text-danger'>*</span>
                        <label htmlFor="InputDescription" className="form-label">Description</label>
                        <textarea
                            onChange={(e) => { setNewTrip((prev) => ({ ...prev, description: e.target.value })) }}
                            required
                            className="form-control"
                            id="InputDescription"
                            placeholder="Enter description (Max 1000 characters)"
                            rows="3"
                            maxLength={1000}
                            value={newTrip.description}
                        />
                    </div>}
                    <div className="gap-1 d-flex justify-content-between">
                        <div className="mb-3 col-5">
                            <span className='text-danger'>*</span>
                            <label htmlFor="InputMonth" className="form-label">Month</label>
                            <Select
                                onChange={(e) => { setNewTrip((prev) => ({ ...prev, month: e.value })) }}
                                required
                                id="InputMonthYear"
                                placeholder="month"
                                options={months}
                                value={months.find(m => m.value === newTrip.month) || null}
                                isOptionDisabled={(option) => option.isDisabled}
                            />
                        </div>
                        <div className="mb-3 col-7">
                            <span className='text-danger'>*</span>
                            <label htmlFor="InputYear" className="form-label">Year</label>
                            <Select
                                onChange={(e) => {
                                    const selectedYear = e?.value;
                                    setNewTrip((prev) => {
                                        // Reset month if year === current year & selected month inValid
                                        const invalidMonth = type === 'historic'
                                            ? selectedYear === currentYear && prev.month > currentMonth
                                            : selectedYear === currentYear && prev.month < currentMonth;
                                        return {
                                            ...prev,
                                            year: selectedYear,
                                            month: invalidMonth ? null : prev.month
                                        };
                                    });
                                }}
                                required
                                id="InputMonthYear"
                                placeholder="year"
                                options={years}
                                defaultValue={years.find(y => y.value === newTrip.year)}
                            />
                        </div>
                    </div>
                    {type === 'historic' && <div className="mb-3">
                        <span className='text-danger'>*</span>
                        <label htmlFor="InputScore" className="form-label mb-0">Score</label>
                        <ReactStars
                            onChange={(newRating) => { setNewTrip((prev) => ({ ...prev, score: newRating })) }}
                            className=''
                            id="InputScore"
                            value={newTrip.score}
                            count={5}
                            size={44}
                            half={false}
                        />
                        <span id="scoreError" className={`text-danger d-${showScoreAlert}`}>Please rate the trip</span>
                    </div>}
                    <div className="mb-3">
                        <label htmlFor="InputHotel" className="form-label">Hotel</label>
                        <input
                            onChange={(e) => { setNewTrip((prev) => ({ ...prev, hotel: e.target.value })) }}
                            type="text"
                            className="form-control"
                            id="InputHotel"
                            placeholder="Enter hotel (Optional)"
                            maxLength={25}
                            value={newTrip.hotel}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-secondary' onClick={handleClose}>Cancel</button>
                {modalRole === 'add' && <button type="submit" className='btn btn-primary' onClick={handleAddTrip}>Add</button>}
                {modalRole === 'update' && <button type="submit" className='btn btn-success' onClick={handleUpdateTrip}>Update</button>}
            </Modal.Footer>
        </Modal >
    )
}