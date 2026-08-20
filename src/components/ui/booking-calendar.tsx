import React, { useState } from 'react';
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  getDay,
  isToday,
  addMonths,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, Globe, Calendar as CalendarIcon, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Store confirmed booking details separately so they persist after reset
  const [confirmedName, setConfirmedName] = useState('');
  const [confirmedDate, setConfirmedDate] = useState('');
  const [confirmedTime, setConfirmedTime] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+225',
    phone: '',
    notes: ''
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Calendar logic
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = addDays(monthStart, -getDay(monthStart));
  const endDate = addDays(monthEnd, 6 - getDay(monthEnd));
  const dateFormat = "d";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const timeSlots = [
    "9:00 am", "9:30 am", "10:00 am", "10:30 am",
    "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm", "3:00 pm"
  ];

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleNextStep = () => {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "2df1ca0e-986a-41e3-94d0-ab68cf909d31",
          subject: "New Booking Request from MARQO",
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          notes: formData.notes,
          date: format(selectedDate!, "EEEE, MMMM d, yyyy"),
          time: selectedTime,
        }),
      });

      const result = await response.json();
      if (result.success) {
        // Save confirmed details before resetting form
        setConfirmedName(formData.name);
        setConfirmedDate(format(selectedDate!, "EEEE, MMMM d, yyyy"));
        setConfirmedTime(selectedTime!);

        // Reset the form fields
        setFormData({ name: '', email: '', countryCode: '+225', phone: '', notes: '' });
        setSelectedDate(null);
        setSelectedTime(null);

        // Show success screen
        setStep(3);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setStep(1);
    setConfirmedName('');
    setConfirmedDate('');
    setConfirmedTime('');
  };

  return (
    <div className="w-full max-w-[1050px] mx-auto bg-white/90 dark:bg-[#f3f0e9] border border-[#1E45FB]/20 rounded-2xl shadow-xl overflow-hidden text-[#1E45FB]">

      {/* Step 3: Full-width Success Screen */}
      {step === 3 && (
        <div className="w-full flex flex-col items-center justify-center text-center py-20 px-8 bg-white animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-[#CDF22B] rounded-full flex items-center justify-center text-[#1E45FB] mb-8 animate-in zoom-in-50 duration-300">
            <CheckCircle2 size={40} />
          </div>
          <p className="font-mono-marqo text-[10px] uppercase tracking-[.2em] text-[#CDF22B] bg-[#1E45FB] px-4 py-1.5 rounded-full mb-6">
            Booking Confirmed
          </p>
          <h3 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            You're all set, {confirmedName}!
          </h3>
          <p className="text-[#1E45FB]/60 mb-2 max-w-md text-base">
            Your call has been scheduled for:
          </p>
          <p className="font-display font-bold text-[#1E45FB] text-xl md:text-2xl mb-2">
            {confirmedDate}
          </p>
          <p className="font-display font-bold text-[#1E45FB] text-xl md:text-2xl mb-10">
            at {confirmedTime}
          </p>
          <p className="text-[#1E45FB]/50 mb-10 max-w-xs text-sm">
            We'll confirm via WhatsApp shortly. Looking forward to talking!
          </p>
          <button
            onClick={handleBookAnother}
            className="bg-[#1E45FB] text-[#CDF22B] px-10 py-4 rounded-full font-mono-marqo text-[10px] font-bold uppercase tracking-[.15em] hover:bg-[#1E45FB]/90 transition-all"
          >
            Book another call
          </button>
        </div>
      )}

      {/* Steps 1 & 2: Normal split layout */}
      {step !== 3 && (
        <div className="flex flex-col lg:flex-row">
          {/* Left Panel: Information */}
          <div className="w-full lg:w-[340px] shrink-0 border-b lg:border-b-0 lg:border-r border-[#1E45FB]/15 p-6 sm:p-8 flex flex-col bg-[#f3f0e9]/50 relative">

            {step === 2 && (
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1E45FB]/20 mb-6 hover:bg-[#CDF22B] transition-colors group"
                aria-label="Go back"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Profile */}
            <div className="mb-6">
              <div className="h-12 w-12 rounded-full overflow-hidden mb-3 border border-[#1E45FB]/10">
                <img src="/PHOTO-2026-08-11-18-24-22.jpg" alt="MARQO Studio" className="h-full w-full object-cover" />
              </div>
              <p className="font-mono-marqo text-[11px] uppercase tracking-[.1em] opacity-60">MARQO Studio</p>
              <h2 className="font-display text-2xl font-bold tracking-tight mt-1">Let's talk about your project.</h2>
            </div>

            <p className="text-sm leading-relaxed text-[#1E45FB]/70 mb-8 font-medium">
              Pick a time that works for you. We will walk through your goals, the type of video you need, and what the process looks like from there.
            </p>

            {/* Details list */}
            <div className="space-y-4 font-mono-marqo text-[11px] uppercase tracking-[.08em] mt-auto">
              {step === 2 && selectedDate && selectedTime && (
                <div className="flex items-start gap-3">
                  <CalendarIcon size={16} className="shrink-0 mt-0.5" />
                  <div className="font-medium">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}<br/>
                    {selectedTime}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Clock size={16} className="shrink-0" />
                <span className="font-medium">15m</span>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp size={16} className="shrink-0 text-[#1E45FB]" />
                <span className="font-medium">WhatsApp</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={16} className="shrink-0" />
                <span className="font-medium">Africa/Abidjan</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Content */}
          <div className="flex-1 p-6 sm:p-8 bg-white">
            {step === 1 ? (
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-full">

                {/* Calendar Column */}
                <div className="flex-1 max-w-[420px] mx-auto w-full">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display text-lg font-bold">
                      {format(currentMonth, "MMMM yyyy")}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button onClick={prevMonth} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#1E45FB]/10 transition-colors">
                        <ChevronLeft size={18} />
                      </button>
                      <button onClick={nextMonth} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#1E45FB]/10 transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-y-2 gap-x-1 sm:gap-x-2 text-center mb-2">
                    {weekDays.map(day => (
                      <div key={day} className="font-mono-marqo text-[9px] font-semibold uppercase tracking-wider opacity-50">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-y-2 gap-x-1 sm:gap-x-2">
                    {days.map((day) => {
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      const isCurrentMonth = isSameMonth(day, currentMonth);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const isPast = day < today;

                      return (
                        <button
                          key={day.toString()}
                          disabled={!isCurrentMonth || isPast}
                          onClick={() => handleDateClick(day)}
                          className={`
                            aspect-square flex flex-col items-center justify-center rounded-full text-sm font-semibold transition-all relative
                            ${!isCurrentMonth || isPast ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#CDF22B]/50 hover:text-[#1E45FB]'}
                            ${isSelected ? 'bg-[#1E45FB] text-[#CDF22B] shadow-md hover:bg-[#1E45FB] hover:text-[#CDF22B]' : ''}
                            ${isToday(day) && !isSelected ? 'text-[#1E45FB] bg-[#1E45FB]/5' : ''}
                          `}
                        >
                          {format(day, dateFormat)}
                          {isSelected && <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#CDF22B]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Column */}
                {selectedDate && (
                  <div className="w-full lg:w-[260px] shrink-0 animate-in fade-in slide-in-from-right-4 duration-300">
                    <p className="font-display font-medium text-base mb-6 pt-1">
                      {format(selectedDate, "EEEE, MMM d")}
                    </p>
                    <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar pb-8">
                      {timeSlots.map(time => {
                        const isSelected = selectedTime === time;
                        return (
                          <div key={time} className="flex items-center gap-2">
                            <button
                              onClick={() => handleTimeClick(time)}
                              className={`
                                flex-1 py-3 px-4 rounded-lg border font-mono-marqo text-[11px] font-bold tracking-wider transition-all duration-200
                                ${isSelected
                                  ? 'bg-[#1E45FB] border-[#1E45FB] text-[#CDF22B]'
                                  : 'border-[#1E45FB]/20 hover:border-[#1E45FB] hover:bg-[#1E45FB]/5 bg-transparent'
                                }
                              `}
                            >
                              {time}
                            </button>
                            {isSelected && (
                              <button
                                onClick={handleNextStep}
                                className="bg-[#1E45FB] text-white px-4 py-3 rounded-lg font-display text-sm font-semibold animate-in fade-in slide-in-from-left-2 shrink-0 hover:bg-[#1E45FB]/90 shadow-sm"
                              >
                                Next
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Step 2: Details Form */
              <div className="w-full max-w-lg mx-auto h-full animate-in fade-in zoom-in-95 duration-300 flex flex-col">
                <h3 className="font-display text-2xl font-bold mb-8">Your details</h3>

                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                  <label className="block">
                    <span className="font-mono-marqo text-[10px] uppercase tracking-[.13em] text-[#1E45FB]/70 mb-2 block">Your name *</span>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-[#1E45FB]/20 rounded-lg px-4 py-3 outline-none focus:border-[#1E45FB] focus:ring-1 focus:ring-[#1E45FB]/20 transition-all font-display bg-transparent"
                    />
                  </label>

                  <label className="block">
                    <span className="font-mono-marqo text-[10px] uppercase tracking-[.13em] text-[#1E45FB]/70 mb-2 block">Email address *</span>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border border-[#1E45FB]/20 rounded-lg px-4 py-3 outline-none focus:border-[#1E45FB] focus:ring-1 focus:ring-[#1E45FB]/20 transition-all font-display bg-transparent"
                    />
                  </label>

                  <label className="block">
                    <span className="font-mono-marqo text-[10px] uppercase tracking-[.13em] text-[#1E45FB]/70 mb-2 flex items-center gap-1">
                      WhatsApp number *
                    </span>
                    <div className="flex border border-[#1E45FB]/20 rounded-lg overflow-hidden focus-within:border-[#1E45FB] focus-within:ring-1 focus-within:ring-[#1E45FB]/20 transition-all bg-transparent">
                      <div className="px-2 py-3 border-r border-[#1E45FB]/20 flex items-center bg-[#f3f0e9]/30">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                          className="bg-transparent text-sm font-display font-medium outline-none cursor-pointer max-w-[80px]"
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+225">🇨🇮 +225</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+234">🇳🇬 +234</option>
                          <option value="+27">🇿🇦 +27</option>
                          <option value="+55">🇧🇷 +55</option>
                          <option value="+52">🇲🇽 +52</option>
                          <option value="">🌐 Other</option>
                        </select>
                      </div>
                      <input
                        required
                        type="tel"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="flex-1 px-4 py-3 outline-none font-display bg-transparent"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="font-mono-marqo text-[10px] uppercase tracking-[.13em] text-[#1E45FB]/70 mb-2 block">Additional notes</span>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full resize-none border border-[#1E45FB]/20 rounded-lg px-4 py-3 outline-none focus:border-[#1E45FB] focus:ring-1 focus:ring-[#1E45FB]/20 transition-all font-display bg-transparent"
                      placeholder="Please share anything that will help prepare for our meeting."
                    />
                  </label>

                  <div className="pt-4 flex items-center justify-between border-t border-[#1E45FB]/10 mt-8">
                    <p className="text-xs text-[#1E45FB]/60 max-w-[240px]">
                      By proceeding, you agree to MARQO's Terms and Privacy Policy.
                    </p>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="md:hidden font-mono-marqo text-[10px] font-bold uppercase tracking-[.15em] opacity-60"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#1E45FB] hover:bg-[#1E45FB]/90 text-[#CDF22B] px-8 py-3.5 rounded-full font-mono-marqo text-[10px] font-bold uppercase tracking-[.15em] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Confirming
                          </>
                        ) : (
                          'Confirm'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
