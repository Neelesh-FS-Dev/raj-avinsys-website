# Media asset manifest

Source: the live site https://www.rajgrouponline.com/ (homepage, about, projects, clientele, certificates, contact, careers, and the six service pages listed in its sitemap). Assets were fetched on 23 Nov 2026 and compared by SHA-256 checksum with `public/media`. Local paths are relative to `public/`.

Status key:
- **Verified (identical)**: the local file is byte-identical to the live file.
- **Derived**: produced from a verified original by re-encoding or resizing. The original is kept.
- **Held**: copied locally but not rendered on any page until written permission is on file.
- **Unverified**: present in the repo, with no live counterpart found. Not used on any page.

## 1. Live assets matched to local files

| Original URL (live site) | Local path | Status | Used on |
|---|---|---|---|
| `/logo.jpg` | `branding/logo.jpg` | Verified (identical). The file is PNG data under a `.jpg` name | Original kept for parity |
| `/logo.jpg` | `branding/logo.png` | Derived (same bytes, correct extension) | Site header |
| `/favicon-48.png` | `branding/favicon-48.png` | Verified (identical) | Favicon |
| `/hero.mp4` | `videos/hero.mp4` | Verified (identical), 1920×1080, 16 s, with audio, 15.1 MB | Original kept. Not served to pages |
| `/hero.mp4` | `videos/hero-720.mp4` | Derived: 1280×720, H.264, no audio, 2.5 MB | Homepage hero, large screens only |
| `/hero.mp4` | `videos/hero-720.webm` | Derived: 1280×720, VP9, no audio, 3.3 MB | Homepage hero, large screens only |
| `/Samples/hero-poster.webp` | `posters/hero-poster.webp` | Verified (identical), 1920×1080 | Homepage hero poster, 1920w |
| `/Samples/hero-poster.webp` | `posters/hero-poster-960.webp` | Derived: 960×540, WebP q80 | Homepage hero poster, 960w |
| `/Services/Turnkey.webp` | `services/turnkey.webp` | Verified (identical), 1024×911 | Homepage capability card: Turnkey HT/LT Electrification |
| `/Samples/Turnkey-Subsection (Turnkey Up to 66KV).webp` | `infrastructure/turnkey-up-to-66kv.webp` | Verified (identical), 1024×1024 | Homepage capability card: Electrical Panels |
| `/Samples/Electrical Renovation and Retrofitting.webp` | `services/electrical-renovation-retrofitting.webp` | Verified (identical), 1024×1024 | Homepage capability card: Retrofitting and Utility |
| `/Certificate/Getco.webp` | `certifications/getco.webp` | Verified (identical). Not reviewed for content | Not rendered |
| `/Certificate/ISO certificate.webp` | `certifications/iso-certificate.webp` | Verified (identical). Not reviewed for content | Not rendered |
| `/Certificate/electrical contractor letter.webp` | `certifications/electrical-contractor-letter.webp` | Verified (identical). Not reviewed for content | Not rendered |
| `/Certificate/RVPL_page-0003.webp` | `certifications/rvpl-page-0003.webp` | Verified (identical). Not reviewed for content | Not rendered |
| `/Certificate/RVPL_page-0004.webp` | `certifications/rvpl-page-0004.webp` | Verified (identical). Not reviewed for content | Not rendered |

### Client logos (permission required)

These are held. The verification report says client names and logos need written permission per client before publication. None are rendered.

| Original URL | Local path | Status |
|---|---|---|
| `/clients/hyatt.png` | `clients/hyatt.png` | Held |
| `/clients/GFL.png` | `clients/gfl.png` | Held |
| `/clients/Solvay.png` | `clients/solvay.png` | Held |
| `/clients/hikal.png` | `clients/hikal.png` | Held |
| `/clients/L&T.png` | `clients/l-t.png` | Held |
| `/clients/BASF.png` | `clients/basf.png` | Held |
| `/clients/kei.jpg` | `clients/kei.jpg` | Held |
| `/clients/MG.png` | `clients/mg.png` | Held |
| `/clients/songwon.png` | `clients/songwon.png` | Held |
| `/clients/Alembic.png` | `clients/alembic.png` | Held |
| `/clients/SNKUSM.png` | `clients/snkusm.png` | Held |
| `/clients/Bharat-Rasayan.jpg` | `clients/bharat-rasayan.jpg` | Held |
| `/clients/Aarti_Industries.jpg` | `clients/aarti-industries.jpg` | Held |
| `/clients/Gerresheimer.png` | `clients/gerresheimer.png` | Held |
| `/clients/nerolac.png` | `clients/nerolac.png` | Held |
| `/clients/upl.jpg` | `clients/upl-2.jpg` | Held |
| `/clients/Berger.png` | `clients/berger.png` | Held |
| `/clients/Glenmark.png` | `clients/glenmark.png` | Held |
| `/clients/ONGC.png` | `clients/ongc.png` | Held |
| `/clients/Atul_logo.png` | `clients/atul-logo.png` | Held |
| `/clients/Aditya_Birla_Group.png` | `clients/aditya-birla-group.png` | Held |
| `/clients/MRF.png` | `clients/mrf.png` | Held |
| `/clients/SSS.png` | `clients/sss.png` | Held |
| `/clients/cadila.jpg` | `clients/cadila.jpg` | Held |
| `/clients/GSECL.jpg` | `clients/gsecl.jpg` | Held |
| `/clients/cello.jpg` | `clients/cello.jpg` | Held |
| `/clients/Sun_Pharma.png` | `clients/sun-pharma.png` | Held |
| `/clients/jio.png` | `clients/jio.png` | Held |
| `/clients/Voltas.png` | `clients/voltas.png` | Held |
| `/clients/Venus.jpg` | `clients/venus.jpg` | Held |
| `/clients/filatex.png` | `clients/filatex.png` | Held |
| `/clients/LUPIN.png` | `clients/lupin.png` | Held |
| `/clients/JK%20paper.png` | `clients/jk-paper.png` | Held (not in the earlier repo copy; fetched 23 Nov) |
| `/clients/Reliance%20.png` | `clients/reliance.png` | Held (not in the earlier repo copy; fetched 23 Nov) |
| `/clients/Surat%20mahanagar%20palika.jpg` | `clients/surat-mahanagar-palika.jpg` | Held (not in the earlier repo copy; fetched 23 Nov) |

Not copied: `/clients/images%20(2).jpg`. It is an unnamed logo that cannot be attributed to a client, so it is not in the repo.

## 2. Unverified files in the repo

These files are in `public/media`, but no live URL matches them byte-for-byte. Their source needs confirming before any of them goes on the site.

| Folder | Files | Note |
|---|---|---|
| `clients/` | 79 | Most are probably re-encodes of live logos. A sample checked (`berger.png`) has the same dimensions as the live file, but the bytes differ. Held as client logos |
| `projects/` | 6 | `reno-retro-*`, `cabling-site`, `lighting-site`. No live match |
| `manufacturing/` | 9 | `panel-*`, `relay-*`, `main-test-*`. No live match |
| `team/` | 6 | `team.webp`, `careers-1` to `careers-5`. No live match |
| `services/` | 3 | `ups`, `earthing`, `cabling`. No live match |
| `certifications/` | 2 | `rvpl-page-0001`, `rvpl-page-0002`. No live match |
| `branding/` | 5 | Favicon and touch icons other than `favicon-48.png`. No live match |

## 3. Provenance and licensing caveats

- **Stock or generated look.** The hero poster, the hero video and the three service photos look like stock or AI-generated renders, not site photography. The live site uses them, so they are reused here, but they should not be described as "authentic" company photography until the company confirms their origin and licence.
- **Certificates** were not reviewed for content. Their numbers and validity dates are not published. Page text must not describe them as verified.
- **Client logos** require written permission. See the verification report, section 2.

## 4. Build and performance notes

- The hero video is served only on screens 1024 px and wider, and only when the visitor has not asked for reduced motion. Phones get the poster.
- The original 15 MB `hero.mp4` is not referenced by any page.
- Capability card photos use `loading="lazy"` and fixed aspect ratios, so they do not shift the layout.
