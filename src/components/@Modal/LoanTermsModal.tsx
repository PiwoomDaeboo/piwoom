import React from 'react'

import { Box, Button, Flex, Text } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'

interface LoanTermsModalProps {
  isOpen: boolean
  onClose: () => void
  type:
    | 'consentToAccessPersonalContent'
    | 'consentToCollectPersonalContent'
    | 'consentToProvidePersonalContent'
}

function LoanTermsModal({ isOpen, onClose, type }: LoanTermsModalProps) {
  const handleConfirm = () => {
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={false}
      onClose={handleClose}
      size={'xl'}
      header={
        <Box
          pb={'16px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.2'}
        >
          {type === 'consentToAccessPersonalContent' && (
            <Text textStyle={'pre-heading-2'} color={'grey.10'}>
              개인(신용)정보 조회 동의
            </Text>
          )}
          {type === 'consentToCollectPersonalContent' && (
            <Text textStyle={'pre-heading-2'} color={'grey.10'}>
              개인(신용)정보 수집 · 이용 동의
            </Text>
          )}
          {type === 'consentToProvidePersonalContent' && (
            <Text textStyle={'pre-heading-2'} color={'grey.10'}>
              개인(신용)정보 제공 동의서
            </Text>
          )}
        </Box>
      }
      body={
        <>
          {type === 'consentToAccessPersonalContent' && (
            <ConsentToAccessPersonalContent />
          )}
          {type === 'consentToCollectPersonalContent' && (
            <ConsentToCollectPersonalContent />
          )}
          {type === 'consentToProvidePersonalContent' && (
            <ConsentToProvidePersonalContent />
          )}
        </>
      }
      footer={
        <Flex w="100%" gap="12px">
          <Button w="100%" variant={'solid-primary'} onClick={handleConfirm}>
            확인
          </Button>
        </Flex>
      }
    ></ModalBasis>
  )
}

export default LoanTermsModal

const ConsentToAccessPersonalContent = () => {
  return (
    <Flex flexDir={'column'} maxH={'450px'} gap={'12px'} overflowY={'auto'}>
      <Text textStyle={'pre-body-6'}>
        ※필수 동의사항에 대한 동의는 계약의 체결 및 이행을 위하여 필수적이므로,
        아래 사항에 동의하셔야만 대부거래 관계의 설정 또는 유지가 가능합니다.
        동의하셔야만 대부거래 관계의 설정 또는 유지가 가능합니다.
      </Text>
      <Text textStyle={'pre-body-5'}>피움대부 주식회사 귀중</Text>
      <Text textStyle={'pre-body-6'}>
        ※ 피움대부 주식회사가 금융거래와 관련하여 본인의 개인(신용)정보를
        수집·이용 및 제공하기 위해서는 ⌜신용정보의 이용 및 보호에 관한 법률⌟
        제15조, 제32조 내지 제34조, ⌜개인정보보호법⌟ 제15조, 제17조, 제22조 등에
        따라 본인의 동의가 필요합니다.
      </Text>
      <Text textStyle={'pre-body-5'}>조회 대상 기관</Text>
      <Text textStyle={'pre-body-6'}>
        - 신용정보회사(NICE평가정보(주)), 공공기관 등
      </Text>
      <Text textStyle={'pre-body-5'}>조회 목적</Text>
      <Text textStyle={'pre-body-6'}>- 대출계약의 체결·유지·이행·관리 등</Text>
      <Text textStyle={'pre-body-5'}>피움대부 주식회사 귀중</Text>
      <Text textStyle={'pre-body-6'}>
        ※ 피움대부 주식회사가 금융거래와 관련하여 본인의 개인(신용)정보를
        수집·이용 및 제공하기 위해서는 ⌜신용정보의 이용 및 보호에 관한 법률⌟
        제15조, 제32조 내지 제34조, ⌜개인정보보호법⌟ 제15조, 제17조, 제22조 등에
        따라 본인의 동의가 필요합니다.
      </Text>
      <Text textStyle={'pre-body-5'}>조회 대상 기관</Text>
      <Text textStyle={'pre-body-6'}>
        - 신용정보회사(NICE평가정보(주)), 공공기관 등
      </Text>
      <Text textStyle={'pre-body-5'}>조회 동의의 효력기간</Text>
      <Text textStyle={'pre-body-6'}>
        - 조회동의일로부터 당해 대출계약의 효력이 종료되는 시점까지. 단, 본인이
        신청한 대출이 귀사에 의해 거절된 경우에는 그 시점부터 동의의 효력은
        소멸합니다.
      </Text>
      <Text textStyle={'pre-body-5'}>거부 권리 및 불이익</Text>
      <Text textStyle={'pre-body-6'}>
        - 본인은 동의를 거부할 수 있습니다. 다만, 위 개인(신용)정보의 조회에
        관한 동의는 &quot;(금융)거래 계약의 체결 및 이행&quot;을 위한 필수적
        사항이므로, 위 사항에 동의하셔야만 (금융)거래관계의 설정 및 유지가
        가능합니다.
      </Text>
      <Text textStyle={'pre-body-5'}>조회 항목</Text>
      <Text textStyle={'pre-body-6'} whiteSpace={'pre-line'}>
        - 개인(신용)정보
        {'\n'}▷ 일반개인정보 : 성명, 주소, 직장정보, 전화번호, 입금계좌,
        연계정보(CI) 등{'\n'}▷ 신용거래정보 : 대출, 보증, 담보제공, 현금서비스,
        카드론, 신용카드, 자사대출신청정보(신청번호, 신청일자, 신청구분,
        신청채널, 대출상품, 신청금액 등) 및 (가계)당좌예금 개설내역 등{'\n'}▷
        신용도판단정보 : 신용평점, 연체, 부도, 대위변제, 기타 신용질서 문란행위
        관련 금액 등{'\n'}▷ 신용능력정보 : 개인의 재산, 채무, 소득의 총액,
        납세실적 등{'\n'}▷ 공공정보 등 : 법원의 재판·결정 정보, 체납정보,
        사회보험 및 공공요금 관련 정보 등
      </Text>
      <Text textStyle={'pre-body-5'}>조회 동의의 효력기간</Text>
      <Text textStyle={'pre-body-6'}>
        - 조회동의일로부터 당해 대출계약의 효력이 종료되는 시점까지. 단, 본인이
        신청한 대출이 귀사에 의해 거절된 경우에는 그 시점부터 동의의 효력은
        소멸합니다.
      </Text>
      <Text textStyle={'pre-body-6'} whiteSpace={'pre-line'}>
        ※ 본 동의서에 의한 개인(신용)정보 조회는 귀하의 신용등급에 영향을 주지
        않습니다.
        {'\n'}※ 본 동의 이후 동일한 목적 또는 이용 범위 내에서 개인(신용)정보의
        정확성, 최신성을 유지하기 위해 제공하는 경우에는 별도의 추가 동의가
        필요하지 않습니다.
        {'\n'}※ 본 동의 이전에 발생한 개인(신용)정보도 포함됩니다.
      </Text>
      <Text textStyle={'pre-body-5'}>조회 동의의 효력기간</Text>
      <Text textStyle={'pre-body-6'}>
        - 조회동의일로부터 당해 대출계약의 효력이 종료되는 시점까지. 단, 본인이
        신청한 대출이 귀사에 의해 거절된 경우에는 그 시점부터 동의의 효력은
        소멸합니다.
      </Text>
    </Flex>
  )
}

//개인(신용)정보 수집 · 이용 동의
const ConsentToCollectPersonalContent = () => {
  return (
    <Flex flexDir={'column'} maxH={'450px'} gap={'12px'} overflowY={'auto'}>
      <Text textStyle={'pre-body-5'}>개인(신용)정보 수집 · 이용 동의</Text>
      <Text textStyle={'pre-body-6'}>
        ※필수 동의사항에 대한 동의는 계약의 체결 및 이행을 위하여 필수적이므로,
        아래 사항에 동의하셔야만 대부거래 관계의 설정 또는 유지가 가능합니다.
      </Text>

      <Text textStyle={'pre-body-5'}>
        개인(신용)정보의 필수적인 수집·이용에 관한 사항
      </Text>
      <Text textStyle={'pre-body-6'}>
        ※ 필수 동의사항에 대한 동의는 계약의 체결 및 이행을 위하여 필수적이므로,
        아래 사항에 동의하셔야만 대부거래 관계의 설정 또는 유지가 가능합니다.
      </Text>

      <Text textStyle={'pre-body-5'}>피움대부 주식회사 귀중</Text>
      <Text textStyle={'pre-body-6'}>
        ※ 피움대부 주식회사가 금융거래와 관련하여 본인의 개인(신용)정보를
        수집·이용 및 제공하기 위해서는 ⌜신용정보의 이용 및 보호에 관한 법률⌟
        제15조, 제32조 내지 제34조, ⌜개인정보보호법⌟ 제15조, 제17조, 제22조 등에
        따라 본인의 동의가 필요합니다.
      </Text>

      <Text textStyle={'pre-body-5'}>수집·이용 목적</Text>
      <Text textStyle={'pre-body-6'}>
        - 대출계약의 체결·유지·이행·관리, 금융사고조사, 법령상 의무이행,
        분쟁처리, 민원해결, 본인 여부 확인 등
      </Text>

      <Text textStyle={'pre-body-5'}>보유 및 이용기간</Text>
      <Text textStyle={'pre-body-6'}>
        - 수집·이용 동의일로부터 본인이 신청한 대부거래가 귀사에 의해 거절된
        시점까지 또는 (금융)거래종료(채권·채무 관계가 해소된 시점) 후 5년까지
        금융사고 조사, 분쟁해결, 민원처리, 법령상 의무이행 및 리스크 관리 업무를
        위해서만 보유·이용됩니다.
      </Text>

      <Text textStyle={'pre-body-5'}>거부 권리 및 불이익</Text>
      <Text textStyle={'pre-body-6'}>
        - 위 개인신용정보의 수집·이용에 관한 동의는 &quot;(금융)거래 계약의 체결
        및 이행&quot;을 위한 필수적 사항이므로, 위 사항에 동의하셔야만
        (금융)거래관계의 설정 및 유지가 가능합니다.
      </Text>

      <Text textStyle={'pre-body-5'}>수집·이용 항목</Text>
      <Text textStyle={'pre-body-6'} whiteSpace={'pre-line'}>
        - 개인(신용)정보
        {'\n'}▷ 자사대출신청정보 : 성명, 신청일자, 신청채널, 신청상품, 신청금액,
        신청용도, 신청결과, 신청구분, 직장 및 자택 정보 등{'\n'}▷ 일반개인정보 :
        성명, 주소, 직장정보, 전화번호, 입금계좌, 연계정보(CI) 등{'\n'}▷
        신용거래정보 : 대출, 보증, 담보제공, 현금서비스, 카드론, 신용카드,
        자사대출신청정보(신청번호, 신청일자, 신청구분, 신청채널, 대출상품,
        신청금액 등) 및 (가계)당좌예금 개설내역 등{'\n'}▷ 신용도판단정보 :
        신용평점, 연체, 부도, 대위변제, 기타 신용질서 문란행위 관련 금액 등
        {'\n'}▷ 신용능력정보 : 개인의 재산, 채무, 소득의 총액, 납세실적 등{'\n'}
        ▷ 공공정보 등 : 법원의 재판·결정 정보, 체납정보, 사회보험 및 공공요금
        관련 정보 등{'\n'}▷ 기타 계약 및 서비스의 체결 · 유지 · 이행 · 관리 ·
        개선 등과 관련하여 본인이 제공한 정보
      </Text>

      <Text textStyle={'pre-body-6'} whiteSpace={'pre-line'}>
        ※ 본 동의 이후 동일한 목적 또는 이용 범위 내에서 개인(신용)정보의
        정확성, 최신성을 유지하기 위해 제공하는 경우에는 별도의 추가 동의가
        필요하지 않습니다.
        {'\n'}※ 본 동의 이전에 발생한 개인(신용)정보도 포함됩니다.
      </Text>
    </Flex>
  )
}

const ConsentToProvidePersonalContent = () => {
  return (
    <Flex flexDir={'column'} maxH={'450px'} gap={'12px'} overflowY={'auto'}>
      <Text textStyle={'pre-body-5'}>개인(신용)정보 제공 동의서</Text>
      <Text textStyle={'pre-body-6'}>
        ※필수 동의사항에 대한 동의는 계약의 체결 및 이행을 위하여 필수적이므로,
        아래 사항에 동의하셔야만 대부거래 관계의 설정 또는 유지가 가능합니다.
      </Text>

      <Text textStyle={'pre-body-5'}>
        개인(신용)정보의 필수적인 제공에 관한 사항
      </Text>
      <Text textStyle={'pre-body-6'}>
        ※ 필수 동의사항에 대한 동의는 계약의 체결 및 이행을 위하여 필수적이므로,
        아래 사항에 동의하셔야만 대부거래 관계의 설정 또는 유지가 가능합니다.
      </Text>

      <Text textStyle={'pre-body-5'}>피움대부 주식회사 귀중</Text>
      <Text textStyle={'pre-body-6'}>
        ※ 피움대부 주식회사가 금융거래와 관련하여 본인의 개인(신용)정보를
        수집·이용 및 제공하기 위해서는 ⌜신용정보의 이용 및 보호에 관한 법률⌟
        제15조, 제32조 내지 제34조, ⌜개인정보보호법⌟ 제15조, 제17조, 제22조 등에
        따라 본인의 동의가 필요합니다.
      </Text>

      <Text textStyle={'pre-body-5'}>제공받는 자</Text>
      <Text textStyle={'pre-body-6'}>
        - 대출계약 이행에 필요한 업무를 위수탁 받은 자, 차입(사채발행 포함)을
        위한 담보제공시의 금융기관 등 담보권자(담보권자의 수탁대리인 및
        채권추심인 포함)
        {'\n'}당사는 제3자에게 개인(신용)정보를 제공할 경우, 최소한의 정보만을
        제공하며, 제3자에 관한 추가·변경 및 제공 목적의 세부적 내용은 당사
        홈페이지(www.piwoom.com)에서 확인하실 수 있습니다.
      </Text>

      <Text textStyle={'pre-body-5'}>제공 목적</Text>
      <Text textStyle={'pre-body-6'}>
        - 본인확인 및 신용도 평가 등 신용조회업무, 계약 등 대부거래의 체결 유지
        이행관리, 채권추심 및 배송업무, 당사차입에 대한 담보제공, 범죄의 고소 ·
        고발, 연계정보(CI) 생성 및 제공 등
      </Text>

      <Text textStyle={'pre-body-5'}>보유 및 이용기간</Text>
      <Text textStyle={'pre-body-6'}>
        - 수탁업체에 제공한 개인(신용)정보는 거래종료일(채권·채무 관계가 해소된
        시점) 이내에서 수탁계약 종료시까지 보유·이용됩니다.
      </Text>

      <Text textStyle={'pre-body-5'}>거부 권리 및 불이익</Text>
      <Text textStyle={'pre-body-6'}>
        - 위 개인신용정보의 제공에 관한 동의는 &quot;(금융)거래 계약의 체결 및
        이행&quot;을 위한 필수적 사항이므로, 위 사항에 동의하셔야만
        (금융)거래관계의 설정 및 유지가 가능합니다.
      </Text>

      <Text textStyle={'pre-body-5'}>제공 항목</Text>
      <Text textStyle={'pre-body-6'}>
        - 개인(신용)정보
        {'\n'}▷ 일반개인정보 : 성명, 주소, 직장정보, 전화번호, 입금계좌,
        연계정보(CI) 등{'\n'}▷ 신용거래정보 : 대출, 보증, 담보제공, 현금서비스,
        카드론, 신용카드, 자사대출신청정보(신청번호, 신청일자, 신청구분,
        신청채널, 대출상품, 신청금액 등) 및 (가계)당좌예금 개설내역 등{'\n'}▷
        신용도판단정보 : 신용평점, 연체, 부도, 대위변제, 기타 신용질서 문란행위
        관련 금액 등{'\n'}▷ 신용능력정보 : 개인의 재산, 채무, 소득의 총액,
        납세실적 등{'\n'}▷ 공공정보 등 : 법원의 재판·결정 정보, 체납정보,
        사회보험 및 공공요금 관련 정보 등
      </Text>

      <Text textStyle={'pre-body-6'}>
        ※ 본 동의 이후 동일한 목적 또는 이용 범위 내에서 개인(신용)정보의
        정확성, 최신성을 유지하기 위해 제공하는 경우에는 별도의 추가 동의가
        필요하지 않습니다.
        {'\n'}※ 본 동의 이전에 발생한 개인(신용)정보도 포함됩니다.
      </Text>
    </Flex>
  )
}
