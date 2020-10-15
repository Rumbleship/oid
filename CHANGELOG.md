# Changelog

All notable changes to this project will be documented in this file. Starting with v0.1.0.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [UNRELEASED]

### Added
### Removed
### Changed
### Fixed
### Deprecated
### Security


## [4.0.8] -- 2020-10-15

### Added
  * `Contract`; shortcode:  `con`
  * `LineItem`; shortcode:  `li`
  * `LineItemEvent`; shortcode:  `lie`
  * `OrderEvent`; shortcode:  `oe`
  * `Term`; shortcode:  `term`
  * `QueuedSubscriptionRequest`; shortcode: `qsr`
  * `Webhook`; shorcode: `wh`,
  * `QsrService`; shortcode: `qsrsrvc`
  * `QsrCache`; shortcode `QsrCache` (shortcode is capitalized to indicate it is a special purpose Oid for managing local caches)

## [4.0.7] -- 2020-09-08

### Added
  * `Order` oid; shortcode: `o`
### Removed
  * tslint
### Changed
  * eslint
  * upgrade to typescript 4

## [4.0.6] -- 2020-07-30

### Added
* `PlaidIdentity` oid; shortcode: `pident`
* `PlaidIdentityEntry` oid; shortcode: `pidentry`
### Fixed
  * launch.json boilerplate for new debugger

## [4.0.5] -- 2020-06-09

### Added
  * `ApiKey` oid; shortcode: `key_`

## [4.0.4] -- 2020-05-09

### Added 
  * `PlaidTransaction` oid; shortcode: `ptxn_`

## [4.0.3] -- 2020-04-30

### Added
  * `PlaidWebhook`  oid; shortcode: `phook_`

## [4.0.2] -- 2020-04-20

### Changed
  * Updated tslint.json, tsconfig.json, plugins, etc to support nullish coalescing.
  * package.json engine supports node 12
  * circle builds on node12

## [4.0.1] -- 2020-03-31

### Removed
  * module declaration for `xxhash`
### Changed
  * Updated tslint.json, tsconfig.json, plugins, etc to support nullish coalescing.

## [4.0.0] -- 2020-03-05

### Removed
  * Tilde Oids
### Changed
  * All Banking Oids are now checkdigits:
    * `AchGateway` --> `gate_`
    * `BankAccount` --> `ba_`
    * `BankTransaction` --> `bt_`
    * `Batch` --> `bat_`
    * `OrderReference` --> `or_`
    * `PaymentRequest` --> `pr_`
  * `BuyerApplication` shortcode: `bap_`

## [3.0.3] -- 2020-02-05

### Added
  * `AchFile` oid; shortcode: `ach_`

## [3.0.2] -- 2020-01-31

### Added
  * `BalanceCheck` oid; shortcode: `bal_`

## [3.0.1] -- 2020-01-28

### Changed
  * Removed `test/` from build lib

## [3.0.0] -- 2020-01-13

### Added
  * for Arbiter
    * BusinessApplication (ba_) scope as a CheckDigitScope
    * PendingEvent (pe_) scope as a CheckDigitScope
    * DisposedEvent (de_) scope as a CheckDigitScope
    * AuditEntry (ae_)  scope as a CheckDigitScope
### Removed
  * for Arbiter
    * Activity (act_) scope
    * ExternalEvent(ee_) scope
    * BusinessApplication (be_) scope
  * Removed  enum NoCheckdigitArbiterScopes, as fully deprecated
  * Removed tests for the NoCheckdigitArbiterScopes
### Changed
  * for Arbiter 
    * changed Workflow (wf_) scope to CheckDigitScope
  * Removed `approve_for_publish` step from master:build

## [2.0.2] -- 2020-01-07

### Added
  * New Scopes for Credentials in Mediator:
    * ShopifyCredential
    * WoocommerceCredential
    * BigcommerceCredential
    * TradegeckoCredential

## [2.0.1] -- 2019-12-19

### Added
  * DivisionRelationship scope "bsr"
  * TermsChoice scope "tc"

## [2.0.0] -- 2019-11-01

### Changed
  * **BREAKING CHANGE** Moved `Buyer` and `Supplier` out of `AlphaHashidScopes` and into plain `CheckdigitScopes`

## [1.0.2] -- 2019-10-30

### Added
  * Missing scopes; `Batch` and `PlaidItem`

## [1.0.1] -- 2019-10-28

### Added
  * Backwards compatible lower-case Oid.create`

## [1.0.0] -- 2019-10-28

### Changed
  * circle config boilerplate
### Security
