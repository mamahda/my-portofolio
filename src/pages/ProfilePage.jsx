import PageShell from "../components/layout/PageShell";
import { QuickActions, SectionNav, SocialIcons } from "../components/layout/SidebarCards";
import AboutSection from "../components/profile/AboutSection";
import FeaturedSection from "../components/profile/FeaturedSection";
import InterestsSection from "../components/profile/InterestsSection";
import {
  CertificationsSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  VolunteeringSection,
} from "../components/profile/ListSections";
import ProfileHeader from "../components/profile/ProfileHeader";
import SkillsSection from "../components/profile/SkillsSection";

const ProfilePage = () => (
  <PageShell
    aside={
      <>
        <SectionNav />
        <QuickActions className="max-md:border-t-0" />
        <SocialIcons />
      </>
    }
  >
    <ProfileHeader />
    {/* The profile header flows straight into About, as on desktop; the bands only split the sections. */}
    <div className="md:space-y-3 max-md:[&>section:first-child]:border-t-0">
      <AboutSection />
      <FeaturedSection />
      <EducationSection />
      <ProjectsSection />
      <CertificationsSection />
      <SkillsSection />
      <ExperienceSection />
      <VolunteeringSection />
      <InterestsSection />
    </div>
  </PageShell>
);

export default ProfilePage;
