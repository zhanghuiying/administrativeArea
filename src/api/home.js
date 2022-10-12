import request from '../../utils/request'

export function pubList(query) {
  return request({
    url: '/xzq/jbxx/pubList.do',
    method: 'post',
    params: query
  })
}
export function pubOne(ID) {
  return request({
    url: '/xzq/jbxx/pubOne.do?ID='+ `${ID}`,
    method: 'post',
  })
}
export function selectNext(XZQDM) {
  return request({
    url: '/xzq/jbxx/selectNext.do?XZQDM='+ `${XZQDM}`,
    method: 'post',
  })
}


