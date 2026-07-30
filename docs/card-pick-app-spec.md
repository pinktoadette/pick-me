# App Spec: "Pick a Card" Low-Pressure Invite Tool

## Concept
A simple, playful app that lets one person (the "sender") set up a randomized choice of activities for another person (the "picker") to select from — without knowing what each option is until after they've chosen. This removes the pressure of the picker having to make an intentional, evaluable decision, since the outcome is framed as chance rather than a deliberate personal choice.

## Core Flow

1. **Sender setup**
   - Sender creates 3 (or more) "cards," each representing an activity (e.g. "Eat dinner," "Go to movies," "Get coffee").
   - Cards are hidden — picker cannot see contents before choosing.

2. **Picker selection**
   - Picker is presented with 3 face-down cards (visually: simple flip-card UI).
   - Picker taps one card at random.
   - Card flips to reveal the activity.

3. **Date/time reveal**
   - After the card is revealed, a pre-set date and time (chosen by the sender in advance) is displayed alongside the activity.
   - Example: "Get coffee — Saturday, 3:00 PM"

4. **Response step**
   - Picker is given two response options:
     - **Confirm** (single tap, low friction — the default, easy path)
     - **Propose a different time** (slightly higher friction than confirm, but still low-effort — e.g. a simple time picker or a couple of alternate time slot suggestions to choose from, rather than free text)
   - Notably: **no flat "decline" button.** The goal is to avoid giving the picker an easy, low-effort way to opt out entirely, since that risks reverting to passive non-response (the exact failure mode the app is designed to avoid). Instead, "can't make it" flows into "suggest another time" rather than a dead-end rejection.

## Design Principles (Important — please preserve these in implementation)

- **Minimize perceived ownership of the outcome for the picker.** The picker should feel like they're responding to chance/circumstance, not making a deliberate romantic/social decision. Avoid language or UI that makes the choice feel weighty or evaluative.
- **Low cognitive and emotional load at every step.** Big tap targets, minimal text, no open-ended text fields if avoidable (multiple-choice / tap-based interactions preferred over free-form input).
- **Friction should be asymmetric:** confirming should always be the easiest, fastest action available. Any "I can't" path should require slightly more effort (e.g., selecting a reason or proposing an alternate slot) rather than being equally easy to tap as confirm.
- **Playful, low-stakes visual tone.** Card-flip animation, casual copy, nothing that reads as formal or high-stakes (avoid anything resembling a "relationship" or "date confirmation" tone in UI copy).
- **No pressure/urgency mechanics.** No countdown timers, no "read" receipts, no "they're typing" indicators — anything that increases visible social pressure should be avoided.

## Notes for Implementation
- This is intended for two people who already know each other (not a matching/discovery app) — no user search, profiles, or public-facing components needed.
- Simple two-user session model: one sender, one picker, single active "deck" of cards at a time is sufficient for v1.
- Persistence: card contents, date/time, and response status should be stored (see storage API for artifacts if building as a Claude artifact) so state persists if the picker closes and reopens before responding.
