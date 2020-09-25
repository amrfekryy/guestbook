import React from 'react'
import Card from 'components/guestbook_card'
import MessageSection from './messageSection'
import { GETGUESTBOOKPAGE } from 'helpers/queries'
import { message } from 'antd'
import { useQuery } from '@apollo/client'


export default (props) => {
  const { guestbookId } = props

  const { data, loading, error } = useQuery(GETGUESTBOOKPAGE, {
    variables: { guestbookId }
  });
  if (error) return message.error(error.message, 2);
  // if (loading) // do something
  // alert(JSON.stringify(data))

  return (
    <>
      {data && data.guestbookPage && <>
        <Card display='main' {...{ guestbook: data.guestbookPage.guestbook }}/>
        <MessageSection {...{ messages: data.guestbookPage.messages }}/>
      </>}
    </>
  )
}
