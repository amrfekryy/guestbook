import React from 'react'
import Card from 'components/guestbook_card'
import MessageSection from './messageSection'

export default (props) => {
  return (
    <>
      <Card display='main'/>
      <MessageSection />
    </>
  )
}
