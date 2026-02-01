/**
 * Seth Freeman's Professional Resume Data
 * 
 * This file contains all structured resume information for Seth Freeman's portfolio website.
 * The data is organized according to the ResumeData interface and includes comprehensive
 * professional experience, skills, and contact information.
 */

import { ResumeData } from '@/types/resume';

export const resumeData: ResumeData = {
  personalInfo: {
    name: 'Seth Freeman',
    title: 'SRE/DevOps Architect | Infrastructure Reliability Leader | Scalable Systems Expert',
    location: 'Dover, AR',
    email: 'seth@sethops.org',
    phone: '310-430-5224',
    linkedin: 'https://linkedin.com/in/sethtech',
    github: 'https://github.com/sethfreeman'
  },

  summary: 'Strategic DevOps and SRE leader and infrastructure architect with 20+ years of experience designing scalable platforms, driving cloud transformations, and enabling high-velocity software delivery, focusing on reliability, SLOs/error budgets, observability, and production resilience. Proven success in architecting multi-tier environments, implementing CI/CD pipelines, and aligning infrastructure with business goals across AWS, Azure, and hybrid cloud ecosystems. Trusted advisor to Fortune 100 clients and high-growth startups, with hands-on expertise in infrastructure as code, container orchestration, and DevOps maturity frameworks.',

  keyAccomplishments: [
    'Architectural Ownership: Designed and implemented global DevOps frameworks, CI/CD pipelines, and cloud migration strategies.',
    'Global Leadership: Scaled global DevOps team from 3 contractors to 15 FTEs, delivering 24/7 coverage and operational excellence.',
    'Delivery Acceleration: Cut time-to-market by 50% through ephemeral environments and automated SDLC tooling.',
    'Security & Compliance: Enforced governance and cost control across AWS environments and multi-region deployments.',
    'Cross-Functional Influence: Partnered with product, QA, and engineering to align infrastructure with business priorities.',
    'Reliability Engineering & Observability: Implemented comprehensive observability (Datadog, Prometheus, Grafana) to define and track key SLIs/SLOs, reducing mean-time-to-detection (MTTD).',
    'Incident Management & Resilience: Established and led a structured incident response process, performing root cause analysis to prevent recurrence and improve system resilience.',
    'Capacity & Performance Planning: Developed data-driven capacity planning models for multi-region AWS environments, ensuring performance targets were met during peak load and optimizing cloud spend.',
    'Disaster Recovery: Designed Backup and Restore regional DR solution accounting for RTO and RPO requirements making use of AWS native services.'
  ],

  experience: [
    {
      title: 'Senior DevOps Manager (Hands on contract position)',
      company: 'NORTH',
      location: 'Troy, MI (Remote)',
      duration: 'September 2025 - Present',
      description: [
        'Act as the principal for both the legacy and next-generation infrastructure.',
        'Serve as a top core contributor, personally writing and maintaining hundreds of lines of IaC and CI/CD code.',
        'Spearhead the migration of a core application from legacy infrastructure to a modern AWS environment, managing the full lifecycle of the Golang application with PostgreSQL and Neo4j backends.',
        'Architect and transform infrastructure from legacy tooling to a robust, GitOps-driven platform utilizing Terraform, Kubernetes, and Flux for repeatable, secure, and scalable deployments.',
        'Implement comprehensive observability stacks using Prometheus, Loki, and Grafana to provide real-time monitoring and alerting, improving system reliability and reducing Mean Time to Resolution (MTTR).',
        'Automate end-to-end CI/CD pipelines via GitHub Actions, streamlining delivery and integrating data reporting via Snowflake, cutting deployment time by an estimated 50%.',
        'Manage a team of three contractors, providing technical guidance, code reviews, and project coordination.'
      ]
    },
    {
      title: 'Founder, Principal',
      company: 'AccelerOps',
      location: 'Remote',
      duration: 'September 2025 - Present',
      description: [
        'Spearhead a DevOps consulting firm specializing in modern infrastructure practices, cloud migrations, and platform engineering.',
        'Lead comprehensive evaluations of client\'s current DevOps practices, identifying bottlenecks, gaps, and developing roadmaps with ROI projections.',
        'Architect and execute seamless, zero-downtime cloud migrations to AWS, Azure, or GCP, ensuring cost optimization and security compliance.',
        'Build robust, scalable platforms for clients using Infrastructure as Code, CI/CD pipelines, and comprehensive observability to empower development teams.',
        'Leverage Security-Left principles, embedding security by design and automated vulnerability scanning/compliance validation throughout the SDLC.',
        'Publish deep-dive technical articles on advanced deployment strategies (blue-green, canary, rolling updates), IaC best practices, and observability for modern applications.'
      ]
    },
    {
      title: 'DevOps Manager',
      company: 'Shell Recharge Solutions',
      location: 'Los Angeles, CA (Remote)',
      duration: 'September 2021 - August 2025',
      description: [
        'Architected and led migration from legacy VMs to orchestrated containers (Kubernetes), significantly increasing system uptime and enabling scalable, resilient deployments.',
        'Automated IaC using Terraform in GitHub Actions for AWS managed services including EKS, ECR, RDS, OpenSearch, MSK, AMQ, ElastiCache, VPC, S3, EC2, Config, ELB, Transfer Family, WAF, Global Accelerator, Route 53, DynamoDB, Cloudfront, IAM',
        'Orchestrated Teamcity CI/CD pipeline refresh with persistent ephemeral environments and SDLC automation, accelerating delivery speed by 50% while maintaining error budgets.',
        'Designed Backup and Restore regional DR solution, exceeding RTO and RPO requirements to ensure business continuity and minimize downtime.',
        'Coordinated cross-functional priorities and interdependencies for multi-region product rollouts, leveraging monitoring/observability tools for validation.',
        'Designed and implemented migration strategy to corporate AWS accounts, ensuring compliance, security, and cost control across teams. Championed the rollout of a unified DevOps framework adopted globally, improving incident response and MTTR.',
        'Collaborated with and led a globally distributed team of 15 engineers in a follow-the-sun DevOps model to ensure 24/7 reliability coverage and production stability.'
      ]
    },
    {
      title: 'Quality Engineering Director (Interim)',
      company: 'Shell Recharge Solutions',
      location: 'Los Angeles, CA (Remote)',
      duration: 'February 2023 - May 2023',
      description: [
        'Drove adoption of a shift-left quality strategy, introducing early-phase test automation and CI integration.',
        'Directed a global quality engineering team of 30+ across QA, automation, and test infrastructure.',
        'Led validation and rollout of newly containerized services, ensuring readiness and system stability.',
        'Realigned team structure and resources to improve velocity and cross-functional alignment during organizational transition.'
      ]
    },
    {
      title: 'Lead DevOps Engineer',
      company: 'Shell Recharge Solutions',
      location: 'Los Angeles, CA (Remote)',
      duration: 'March 2021 - September 2021',
      description: [
        'Automated cloud infrastructure provisioning and deployment pipelines to enhance scalability and consistency across environments.',
        'Managed blue-green deployment strategies to ensure seamless, zero-downtime releases to production.',
        'Conducted hands-on training sessions to upskill engineering and QA teams on new automation tools, fostering a culture of DevOps maturity.'
      ]
    },
    {
      title: 'Senior DevOps Engineer, DevOps Engineer, Lead QA Engineer',
      company: 'Lab Zero',
      location: 'San Francisco, CA (Remote)',
      duration: 'March 2010 - March 2021',
      description: [
        'Architected and implemented a secure, scalable 3-tier infrastructure in Azure for a PWC financial services platform across dev, stage, and prod environments, including network segmentation, CI/CD pipelines, and monitoring.',
        'Delivered DevOps, QA, and infrastructure consulting for Fortune 100 clients and high-growth startups across diverse industries. Led end-to-end implementation of containerized infrastructure, CI/CD pipelines, and automated SDLC tooling.',
        'Architected and deployed solutions for SRE, observability, and Infrastructure as Code across cloud and hybrid environments. Served as trusted advisor to clients including Apple, PwC, Visa, Birst, and FHLB San Francisco.',
        'Drove technical excellence in container orchestration, QA strategy, and platform reliability as part of cross-functional agile teams.'
      ]
    },
    {
      title: 'Director of Product',
      company: 'Smarter Medical Care',
      location: 'Berkeley, CA (Remote)',
      duration: '2015 - 2017',
      description: [
        'Partnered with Lab Zero leadership to drive business development and client engagement strategies.',
        'Defined and optimized the product delivery lifecycle, improving development efficiency and clarity.',
        'Collaborated closely with the Founder/CEO to formalize product development workflows and align technical execution with business goals.'
      ]
    },
    {
      title: 'QA Manager, Senior QA Engineer, Software Configuration Manager',
      company: 'Kodak Gallery / Ofoto, Inc.',
      location: 'Emeryville, CA',
      duration: '2000 - 2009',
      description: [
        'Led the QA strategy for mobile and flagship services, ensuring on-time, high-quality product releases.',
        'Designed and implemented automated build, test, and deployment processes; trained cross-functional teams on adoption.',
        'Wrote and executed comprehensive test plans, cases, and regression matrices to support platform stability.',
        'Managed environment configuration and code deployments across QA, staging, and production tiers.',
        'Instituted robust change management policies to maintain release integrity throughout the software lifecycle.',
        'Collaborated with engineering, product, and support teams to streamline documentation and testing alignment.'
      ]
    },
    {
      title: 'QA Technician, Web Developer, SCM Roles',
      company: 'Doughnet and Thomson Learning',
      location: 'Bay Area, CA',
      duration: '1998 - 2000',
      description: [
        'Earlier roles in QA, web development, and software configuration management.'
      ]
    }
  ],

  skills: [
    {
      category: 'SRE/DevOps Focus',
      skills: ['SLO/SLI Definition', 'Incident Management', 'Error Budgets']
    },
    {
      category: 'IaC/Container Orchestration',
      skills: ['Kubernetes (EKS/Other)', 'Terraform', 'Docker Swarm', 'Flux', 'ArgoCD']
    },
    {
      category: 'Cloud',
      skills: ['AWS (deep services)', 'Azure', 'GCP', 'Openstack']
    },
    {
      category: 'Observability',
      skills: ['Prometheus', 'Grafana', 'Datadog', 'Dynatrace', 'NewRelic', 'Icinga / Nagios']
    },
    {
      category: 'Scripting/Programming',
      skills: ['Python', 'Go', 'bash', 'Ruby', 'Perl']
    },
    {
      category: 'Configuration Management',
      skills: ['Ansible', 'Salt', 'Chef']
    },
    {
      category: 'CI/CD',
      skills: ['Jenkins', 'Teamcity', 'Octopus', 'Capistrano']
    },
    {
      category: 'Methodology',
      skills: ['DevOps', 'Agile/SCRUM', '12Factor', 'TDD', 'BDD']
    },
    {
      category: 'Database',
      skills: ['MySQL', 'PostgreSQL', 'Oracle']
    },
    {
      category: 'Cache / NoSQL',
      skills: ['Redis', 'Resque', 'MongoDB']
    },
    {
      category: 'Source Control',
      skills: ['GitHub', 'GitLab', 'Bitbucket', 'Perforce', 'VSS']
    },
    {
      category: 'OS',
      skills: ['Linux', 'MacOS', 'Windows']
    },
    {
      category: 'Web Server',
      skills: ['Apache', 'nginx', 'IIS']
    },
    {
      category: 'Application Server',
      skills: ['Ruby on Rails', 'Tomcat', 'PHP', 'ASP / .NET']
    },
    {
      category: 'Test Automation',
      skills: ['Selenium', 'SauceLabs', 'Cucumber', 'TestDirector', 'FitNesse']
    },
    {
      category: 'Program Management',
      skills: ['Jira', 'Pivotal', 'Trello', 'Wrike']
    },
    {
      category: 'Documentation',
      skills: ['Confluence', 'Box']
    },
    {
      category: 'Artifact Management',
      skills: ['Artifactory', 'Nexus']
    },
    {
      category: 'WebDev',
      skills: ['HTML', 'Javascript', 'CSS', 'ColdFusion', 'WordPress']
    }
  ],

  education: [
    {
      institution: 'Berklee College of Music',
      location: 'Boston, MA',
      degree: 'Bachelor of Music'
    },
    {
      institution: 'Creative Center for Leadership Certificate',
      location: 'San Diego, CA'
    }
  ],

  contact: {
    email: 'seth@sethops.org',
    linkedin: 'https://linkedin.com/in/sethtech',
    github: 'https://github.com/sethfreeman'
  }
};

export default resumeData;