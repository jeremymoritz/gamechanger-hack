/* tslint:disable:no-var-keyword variable-name */

export interface _number extends BaseType {
  content: number
}

export interface _string extends BaseType {
  content: string
}

// Source files:
// https://amazonpayments.s3.amazonaws.com/documents/payments_ipn.xsd

interface BaseType {
  _exists: boolean
  _namespace: string
}
interface _AuthorizationDetails extends BaseType {
  AmazonAuthorizationId: string
  AuthorizationAmount: Price
  AuthorizationFee: Price
  AuthorizationReferenceId: string
  AuthorizationStatus: Status
  CapturedAmount: Price
  CaptureNow: boolean
  CreationTimestamp: Date
  ExpirationTimestamp?: Date
  IdList: IdList
  OrderItemCategories: OrderItemCategories
  SoftDescriptor: string
}
export interface AuthorizationDetails extends _AuthorizationDetails {
  constructor: { new (): AuthorizationDetails }
}
export let AuthorizationDetails: { new (): AuthorizationDetails }

interface _AuthorizationNotification extends BaseType {
  AuthorizationDetails: AuthorizationDetails
}
export interface AuthorizationNotification extends _AuthorizationNotification {
  constructor: { new (): AuthorizationNotification }
}
export let AuthorizationNotification: { new (): AuthorizationNotification }

export type BatchStatus = 'COMPLETED' | 'FAILED'
interface _BatchStatus extends _string {
  content: BatchStatus
}

interface _BatchSummary extends BaseType {
  BatchReferenceId: string
  BatchStatus: BatchStatus
  CreationTimestamp: Date
  ProcessingSummary: ProcessingSummary
  ReportId: string
}
export interface BatchSummary extends _BatchSummary {
  constructor: { new (): BatchSummary }
}
export let BatchSummary: { new (): BatchSummary }

interface _BillingAgreement extends BaseType {
  AmazonBillingAgreementId: string
  BillingAgreementConsent: boolean
  BillingAgreementLimits: BillingAgreementLimits
  BillingAgreementStatus: BillingAgreementStatus
  CreationTimestamp: Date
  SellerBillingAgreementAttributes?: SellerBillingAgreementAttributes
}
export interface BillingAgreement extends _BillingAgreement {
  constructor: { new (): BillingAgreement }
}
export let BillingAgreement: { new (): BillingAgreement }

interface _BillingAgreementLimits extends BaseType {
  AmountLimitPerTimePeriod: Price
  CurrentRemainingBalance: Price
  TimePeriodEndDate: Date
  TimePeriodStartDate: Date
}
export interface BillingAgreementLimits extends _BillingAgreementLimits {
  constructor: { new (): BillingAgreementLimits }
}
export let BillingAgreementLimits: { new (): BillingAgreementLimits }

interface _BillingAgreementNotification extends BaseType {
  BillingAgreement: BillingAgreement
}
export interface BillingAgreementNotification
  extends _BillingAgreementNotification {
  constructor: { new (): BillingAgreementNotification }
}
export let BillingAgreementNotification: {
  new (): BillingAgreementNotification;
}

export type BillingAgreementState =
  | 'Open'
  | 'Suspended'
  | 'Canceled'
  | 'Closed'
interface _BillingAgreementState extends _string {
  content: BillingAgreementState
}

/** Current status of the Billing Agreement */
interface _BillingAgreementStatus extends BaseType {
  LastUpdateTimestamp: Date
  ReasonCode?: string
  ReasonDescription?: string
  State: BillingAgreementState
}
export interface BillingAgreementStatus extends _BillingAgreementStatus {
  constructor: { new (): BillingAgreementStatus }
}
export let BillingAgreementStatus: { new (): BillingAgreementStatus }

interface _CaptureDetails extends BaseType {
  AmazonCaptureId: string
  CaptureAmount: Price
  CaptureFee: Price
  CaptureReferenceId: string
  CaptureStatus: Status
  CreationTimestamp: Date
  IdList: IdList
  RefundedAmount: Price
  SoftDescriptor: string
}
export interface CaptureDetails extends _CaptureDetails {
  constructor: { new (): CaptureDetails }
}
export let CaptureDetails: { new (): CaptureDetails }

interface _CaptureNotification extends BaseType {
  CaptureDetails: CaptureDetails
}
export interface CaptureNotification extends _CaptureNotification {
  constructor: { new (): CaptureNotification }
}
export let CaptureNotification: { new (): CaptureNotification }

interface _Header extends BaseType {
  MerchantIdentifier: string
}
export interface Header extends _Header {
  constructor: { new (): Header }
}
export let Header: { new (): Header }

interface _IdList extends BaseType {
  Id?: string[]
}
export interface IdList extends _IdList {
  constructor: { new (): IdList }
}
export let IdList: { new (): IdList }

export type NonNegativeDouble = number
type _NonNegativeDouble = _number

interface _OrderItemCategories extends BaseType {
  OrderItemCategory?: string[]
}
export interface OrderItemCategories extends _OrderItemCategories {
  constructor: { new (): OrderItemCategories }
}
export let OrderItemCategories: { new (): OrderItemCategories }

interface _OrderReference extends BaseType {
  AmazonOrderReferenceId: string
  CreationTimestamp: Date
  ExpirationTimestamp: Date
  OrderReferenceStatus: OrderReferenceStatus
  OrderTotal?: OrderTotal
  SellerOrderAttributes?: SellerOrderAttributes
}
export interface OrderReference extends _OrderReference {
  constructor: { new (): OrderReference }
}
export let OrderReference: { new (): OrderReference }

interface _OrderReferenceNotification extends BaseType {
  OrderReference: OrderReference
}
export interface OrderReferenceNotification
  extends _OrderReferenceNotification {
  constructor: { new (): OrderReferenceNotification }
}
export let OrderReferenceNotification: { new (): OrderReferenceNotification }

export type OrderReferenceState = 'Open' | 'Suspended' | 'Canceled' | 'Closed'
interface _OrderReferenceState extends _string {
  content: OrderReferenceState
}

/** Current status of the Order Reference */
interface _OrderReferenceStatus extends BaseType {
  LastUpdateTimestamp: Date
  ReasonCode?: string
  ReasonDescription?: string
  State: OrderReferenceState
}
export interface OrderReferenceStatus extends _OrderReferenceStatus {
  constructor: { new (): OrderReferenceStatus }
}
export let OrderReferenceStatus: { new (): OrderReferenceStatus }

/** The total amount for this OrderReference. This field may not be present if the seller has not set it. */
interface _OrderTotal extends BaseType {
  Amount: string
  CurrencyCode: string
}
export interface OrderTotal extends _OrderTotal {
  constructor: { new (): OrderTotal }
}
export let OrderTotal: { new (): OrderTotal }

export type PaymentStatus =
  | 'Pending'
  | 'Open'
  | 'Declined'
  | 'Closed'
  | 'Completed'
interface _PaymentStatus extends _string {
  content: PaymentStatus
}

interface _Price extends BaseType {
  Amount: number
  CurrencyCode: string
}
export interface Price extends _Price {
  constructor: { new (): Price }
}
export let Price: { new (): Price }

interface _ProcessingSummary extends BaseType {
  RequestsFailed: number
  RequestsProcessed: number
  RequestsSuccessful: number
}
export interface ProcessingSummary extends _ProcessingSummary {
  constructor: { new (): ProcessingSummary }
}
export let ProcessingSummary: { new (): ProcessingSummary }

interface _RefundDetails extends BaseType {
  AmazonRefundId: string
  CreationTimestamp: Date
  FeeRefunded: Price
  RefundAmount: Price
  RefundReferenceId: string
  RefundStatus: Status
  RefundType: string
  SoftDescriptor: string
}
export interface RefundDetails extends _RefundDetails {
  constructor: { new (): RefundDetails }
}
export let RefundDetails: { new (): RefundDetails }

interface _RefundNotification extends BaseType {
  RefundDetails: RefundDetails
}
export interface RefundNotification extends _RefundNotification {
  constructor: { new (): RefundNotification }
}
export let RefundNotification: { new (): RefundNotification }

/** A set of attributes that help provide more context about the Seller Order which is represented by this Billing Agreement. */
interface _SellerBillingAgreementAttributes extends BaseType {
  SellerBillingAgreementId?: string
  SellerId?: string
}
export interface SellerBillingAgreementAttributes
  extends _SellerBillingAgreementAttributes {
  constructor: { new (): SellerBillingAgreementAttributes }
}
export let SellerBillingAgreementAttributes: {
  new (): SellerBillingAgreementAttributes;
}

/** A set of attributes that help provide more context about the Seller Order which is represented by this Order Reference. */
interface _SellerOrderAttributes extends BaseType {
  OrderItemCategories?: OrderItemCategories
  SellerId?: string
  SellerOrderId?: string
}
export interface SellerOrderAttributes extends _SellerOrderAttributes {
  constructor: { new (): SellerOrderAttributes }
}
export let SellerOrderAttributes: { new (): SellerOrderAttributes }

interface _Status extends BaseType {
  LastUpdateTimestamp: Date
  ReasonCode?: string
  ReasonDescription?: string
  State: PaymentStatus
}
export interface Status extends _Status {
  constructor: { new (): Status }
}
export let Status: { new (): Status }

export interface NotificationData extends BaseType {
  AuthorizationNotification: AuthorizationNotification
  BillingAgreementNotification: BillingAgreementNotification
  CaptureNotification: CaptureNotification
  OrderReferenceNotification: OrderReferenceNotification
  RefundNotification: RefundNotification
}
export let document: NotificationData

export type IpnBody = {
  Type: string;
  Message: string;
}
export type IpnMessage = {
  NotificationType: string;
  NotificationData: string;
}
