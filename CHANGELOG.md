# Changelog

All notable changes to this project will be documented in this file. Starting with v0.1.0.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
