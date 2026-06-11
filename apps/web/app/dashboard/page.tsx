import React from 'react'
import SideBar from './../../components/sections/dashboard/SideBar';
import Dashboard from './../../components/sections/dashboard/Dashboard';

function Page() {
  return (
    <main className="flex flex-1 min-h-vh justify-start overflow-x-hidden relative bg-dark-bg ">
      <SideBar />
      <Dashboard />
    </main>
  )
}

export default Page