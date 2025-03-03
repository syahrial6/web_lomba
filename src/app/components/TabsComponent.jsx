import React from 'react'
import { Tabs, Tab, CardBody, Card } from '@heroui/react'
import { Bot, LayoutDashboard, User } from 'lucide-react'

const TabsComponent = ({profile,tableNilai,dashboard,rekomendasi_ai}) => {
  return (
    <div className="flex w-full flex-col">
        <Tabs fullWidth="true" aria-label="Options" color='primary' variant="bordered">
          <Tab
            key="profile"
            title={
              <div className="flex items-center space-x-2">
                <User />
                <span className='lg:block hidden'>Profile</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                {profile}
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="dashboard"
            title={
              <div className="flex items-center space-x-2">
                <LayoutDashboard />
                <span className='lg:block hidden'>Dashboard</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                {dashboard}
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="rekomendasi_ai"
            title={
              <div className="flex items-center space-x-2">
                <Bot />
                <span className='lg:block hidden'>Rekomendasi Ai</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                {rekomendasi_ai}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
  )
}

export default TabsComponent
