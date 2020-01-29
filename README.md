# Rumbleship Oids


## WIP
  * Trying to incorporate the service name into the oid itself, so `wf.banking_812398` identified as belonging to a difference service from `wf.onboarding_1293012`
  * Must still accept the old `wf_123921` which implicitly is for onboarding. 
  
## Why Oid
We use oids for several reasons: 
1. Exposing identifiers that are clearly prefixed with what they identify is immensely helpful for us as developers.
2. An Oid is that specific object's *globally unique* identifier. This can then be used for both for caching data at the periphery as well as identifying which microservice (and then which constituent table) a loadbalance should reference to update any canonical reference data.
3. Slight obfuscation of a `database_id`. The hashing algorithm is designed to be incredibly fast and *should not* be relied on for security; it is basic obfuscation.

## Current implementation and best practices
A modern, best-practice Oid consists of three parts: a shortcode prefix and a suffix that is the hash of a database_id, appended with a checkdigit. The format is simple:

```typescript
`${shortcode}_${hashed_database_id}${computed_checkdigit}`
```

The suffix of all modern oids is at least six (6) characters long. An oid whose suffix is less than six characters is indicative of an older Oid that needs special consideration. See below for details.

This library exports all known Rumbleship Oids that exist across our ecosystem.
### Working with Oids
There are four critical actions exposed by this library.
#### Creating an Oid from (Scope, database_id)
Inside any given service, an externally safe Oid can be created by simply calling
```typescript
const scope = 'Workflow';
const database_id = 1;
const oid_string: string = Oid.create(scope, database_id);
// > console.log(oid_string);
// `wf_ovjeyo`
```
#### Creating on Oid from an externally safe oid_string
When an Oid comes in from outside a given service, it is represented as a basic string. Turn it into a useful object as follows: 
```typescript
const oid_string = 'wf_ovjeyo';
const oid: Oid = new Oid(oid_string);
```
#### Unwrapping for database details
Any `Oid` object can be unwrapped to expose the Scope and wrapped database_id for lookups: 
```typescript
const oid_string = 'wf_ovjeyo';
const oid: Oid = new Oid(oid_string);
const { id, scope } = oid.unwrap();
// > console.log(id)
// 1
// console.log(scope)
// > `Workflow`
```
#### Registering a new Scope
None of this Oid magic works if the scope you're trying to use is not registered. If you're experimenting, you can register a scope in your service with:
```typescript
const scope = 'ANewScope';
const shortcode = 'ans';
const scope: Scope = Oid.Register(scope, shortcode);
```
However, this is for _experimentation only_. Once you're confident in this, you _must_ add the scope to this library via pull request to ensure no collisions across the ecosystem.

### Definitions
#### Oid
Either an instance or the static class that is used as an entry point into all things identifier-related. This is a fully fledge TS/JS object.
#### Oid String
The string that is wrapped by an `Oid`. It can be passed around anywhere and act as a guid for the object it represents.
#### Scope
A reference to a table inside of a microservice. Only one scope of any given name can exist in the Rumbleship ecosystem at any given point.
#### Shortcode
The prefix that maps 1:1 to a registered Scope. Like its related entity, Scope, a shortcode must be unique across Rumbleship.
#### Suffix
The combination of `hashid_database_id` and `computed_checkdigit`.
#### Scope Registery
A singleton that manages the mapping of Scope <--> Shortcode


### Creating and Working with Oids


## Overview of history of identifiers at Rumbleship:
Generation of what are now called Oids started in Alpha, with the word "hashid". The initial implementation was 
#### Alpha and Arbiter
Both Alpha and Arbiter oids conform to the `${shortcode}_${hash}` format. Alpha's were created with a checkdigit and a minimum length of 4; Arbiter's had no check digit and a minimum length of 5.

The net result of this can be used to determine whether an oid is an Alpha Oid, a old Arbiter Oid, or a modern one that has a checkdigit.
- If an oid_string is of an Alpha scope, it has a checkdigit.
- If an oid_string is of an Arbiter scope and is 5 characters long, it has no checkdigit. 
- If an oid_string is 5 characters long and of an Arbiter scope, it is an Arbiter oid with no checkdigit
- If an old_string is 6+ characters long, it has a checkdigit.

### Banking
Banking Oids look significantly different; they did not use shortcode prefixes. Instead, they hashed the `Scope` into a number and then base64 encode a stringified JSON object ```{scope, id}```. To guarantee that we can distinguish these from any other oid, we prefix them with a `~`, e.g. `~eyfaoethb`.
