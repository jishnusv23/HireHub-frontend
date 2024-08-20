import InterviewerDashboard from '@/components/interviewer/InterviewerDashboard'
import { LayoutInterviewer } from '@/pages/interviewer/LayoutInterviewer'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const InterViewerRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<LayoutInterviewer/>}>
            <Route index element={<InterviewerDashboard/>}/>
            <Route path='dashboard' element={<InterviewerDashboard/>}/>
        </Route>
    </Routes>
  )
}
