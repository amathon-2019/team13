import React from 'react'
import { Card,Button } from 'antd';
import moment from 'moment';

const tabList = [
  {
    key: 'tab1',
    tab: '로그인 이력',
  },
  {
    key: 'tab2',
    tab: '디바이스목록',
  },
];

class TabsCard extends React.Component {
  state = {
    key: 'tab1',
    noTitleKey: 'app',
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    const log = this.props.histories.map(history => {
      return (
        <div key={history.created} style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            {moment(history.created).format('YYYY년 MM월 DD일 HH:mm:ss')}
          </div>
          <div>
            {history.device === 0 ? 'PC' : 'Mobile'}
          </div>
        </div>
      )
    });
    const devices = this.props.devices.filter(d=> {
      const token = localStorage.getItem('token');
      return token !== d.key
    }).map(d => {
      return (
        <div key={d.created} style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            {moment(d.updated).format('YYYY년 MM월 DD일 HH:mm:ss')}
          </div>
          <div>
            {d.device === 0 ? 'PC' : 'Mobile'}
          </div>
          <Button onClick={()=> this.props.logOut(d.key)}>로그아웃</Button>
        </div>
      )
    })
    const contentList = {
      tab1: log,
      tab2: this.props.devices.length > 1 ? devices : <p>원격 로그인 된 기기가 없습니다.</p>
    };
    
    return (
      <div style={{textAlign: 'left'}}>
        <Card
          style={{ width: '100%' }}
          // title="로그인 이력"
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
          {contentList[this.state.key]}
        </Card>
      </div>
    );
  }
}

export default TabsCard;