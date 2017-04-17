# hapi-podium-orphans-bug

Podium seems to loose log events when `request` && `request.log` is passed into other contexts.

This only happens since the introduction of Podium. It appears to work properly in 14.2.0.
