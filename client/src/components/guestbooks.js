import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/guestbook_card'
import Grid from '@material-ui/core/Grid';
import { UserContext } from 'containers/user_context'
import { GETALLGUESTBOOKS, GETGUESTBOOKSOF } from 'helpers/queries'
import { message } from 'antd'
import { useQuery } from '@apollo/client'
import EmptyCard from 'components/empty_card'

export default function GuestbooksList(props) {
  const { userId, type } = props
  // const { userId, guestbooks = [] } = React.useContext(UserContext);

  const settings = {
    home: {
      query: GETALLGUESTBOOKS,
      variables: {},
      queryName: 'allGuestbooks',
    },
    profile: {
      query: GETGUESTBOOKSOF,
      variables: { variables: { userId } },
      queryName: 'guestbooksOf',
    }
  }[type || 'home']

  const { data, loading, error } = useQuery(settings.query, settings.variables);
  if (error) return message.error(error.message, 2);
  // if (loading) // do something
  const guestbooks = data && data[settings.queryName] ? data[settings.queryName] : []
  // alert(JSON.stringify(data))
  const thereAreGuestbooks = data && guestbooks.length > 0
  return (
    <div>
      <Grid           
        container
        direction="row"
        justify="center"
        spacing={3}
      >
        {thereAreGuestbooks ? 
          guestbooks.map(guestbook => 
            <Grid item xs={12} sm={6} lg={4}>
              <Card {...{ guestbook }}/>
            </Grid>
          ) : <EmptyCard />
        }

      </Grid>
    </div>
  );
}
